# 使用 Confirm 预设
`confirm` 预设的例子。
```html
<n-button
  @click="modalActive = true"
>
  来吧
</n-button>
<n-modal
  v-model="modalActive"
  preset="confirm" 
  title="确认"
  content="你确认?" 
  :closable="false"
  positive-text="确认"
  @positive-click="submitCallback"
  @negative-click="cancelCallback"
  negative-text="算了"
/>
```
```js
export default {
  data () {
    return {
      modalActive: false,
    }
  },
  methods: {
    cancelCallback () {
      this.$NMessage.success('算了')
      this.modalActive = false
    },
    submitCallback () {
      this.$NMessage.success('确认')
      this.modalActive = false
    }
  }
}
```