function createStyleObject (computedStyle) {
  const style = {}
  const length = computedStyle.length
  for (let index = 0; index < length; ++index) {
    const key = computedStyle[index]
    if (~key.indexOf('ransition')) continue
    style[key] = computedStyle[key]
  }
  return style
}

function createDiffedStyleObject (style, computedStyle) {
  const diffedStyle = {}
  for (const key of Object.keys(style)) {
    if (~key.indexOf('ransition')) continue
    if (computedStyle[key] !== style[key]) {
      diffedStyle[key] = computedStyle[key]
    }
  }
  return diffedStyle
}

function getNextBackgroundColorOf (el) {
  const computedStyle = window.getComputedStyle(el)
  const prevStyle = createStyleObject(computedStyle)
  const memorizedTransition = el.style.transition
  const memorizedBackgroundColor = el.style.backgroundColor
  /** Switch to target background */
  el.style.transition = 'none'
  const nextBackgroundColor = computedStyle.backgroundColor
  const diffedStyle = createDiffedStyleObject(prevStyle, computedStyle)
  const memorizedInlineStyle = {}
  const diffedKeys = Object.keys(diffedStyle)
  if (!diffedKeys.length) {
    el.style.transition = memorizedTransition
    return nextBackgroundColor
  }
  for (const key of diffedKeys) {
    memorizedInlineStyle[key] = el.style[key]
  }
  for (const key of diffedKeys) {
    el.style[key] = diffedStyle[key]
  }
  /** Restore previous styles */
  for (const key of diffedKeys) {
    el.style[key] = prevStyle[key]
  }
  void (el.offsetHeight)
  for (const key of diffedKeys) {
    el.style[key] = ''
  }
  for (const key of Object.keys(memorizedInlineStyle)) {
    el.style[key] = memorizedInlineStyle[key]
  }
  el.style.transition = memorizedTransition
  el.style.backgroundColor = memorizedBackgroundColor
  return nextBackgroundColor
}

let cachedNextBackgroundColor = null
let cachedCSSStyleDeclaration = new WeakMap()
let callCount = 0

function cache () {
  callCount++
  if (!cachedNextBackgroundColor) cachedNextBackgroundColor = new Map()
}

function uncache () {
  callCount--
  if (callCount === 0) {
    cachedNextBackgroundColor = null
  }
  if (callCount < 0) {
    console.error(
      '[naive-ui/mixins/hollowoutable]: Call count < 0. If you saw this message, there\'s probably a bug.'
    )
  }
}

const alphaColorRegex = /rgba\((\d|\s|\.)+,(\d|\s|\.)+,(\d|\s|\.)+,((\d|\s|\.)+)\)/

function isTranslucentColor (color) {
  const colors = alphaColorRegex.exec(color)
  if (colors) {
    const alpha = colors[4].trim()
    if (alpha !== '0' || alpha !== '1') {
      return true
    }
  }
  return false
}

export default {
  watch: {
    syntheticTheme (value) {
      if (this.avoidHollowOut) return
      cache()
      this.$nextTick().then(() => {
        this.updateHollowOutAffect(value)
        uncache()
      })
    }
  },
  data () {
    return {
      ascendantBackgroundColor: null,
      hollowOutColorTransitionDisabled: true
    }
  },
  methods: {
    updateHollowOutAffect () {
      let cursor = this.$el
      while (cursor.parentElement) {
        cursor = cursor.parentElement
        let backgroundColor = null
        let CSSStyleDeclaration = cachedCSSStyleDeclaration.get(cursor)
        if (CSSStyleDeclaration) {
          backgroundColor = CSSStyleDeclaration.backgroundColor
        } else {
          CSSStyleDeclaration = window.getComputedStyle(cursor)
          cachedCSSStyleDeclaration.set(cursor, CSSStyleDeclaration)
          backgroundColor = CSSStyleDeclaration.backgroundColor
        }
        if (backgroundColor) {
          if (isTranslucentColor(backgroundColor)) {
            /**
             * If it's facing a translucent color,
             * continue to find a opaque color.
             **/
            continue
          }
          if (cachedNextBackgroundColor) {
            const nextBackgroundColor = cachedNextBackgroundColor.get(cursor)
            if (nextBackgroundColor) {
              this.ascendantBackgroundColor = nextBackgroundColor
              return
            }
          }
          this.ascendantBackgroundColor = getNextBackgroundColorOf(cursor)
          if (cachedNextBackgroundColor) {
            cachedNextBackgroundColor.set(cursor, this.ascendantBackgroundColor)
          }
          return
        }
      }
      /**
       * If no color is found, fallback to it's default color
       */
      this.ascendantBackgroundColor = null
    }
  },
  created () {
    if (this.avoidHollowOut) this.hollowOutColorTransitionDisabled = false
  },
  mounted () {
    if (this.avoidHollowOut) return
    cache()
    this.updateHollowOutAffect()
    this.$nextTick().then(() => {
      this.hollowOutColorTransitionDisabled = false
      uncache()
    })
  }
}