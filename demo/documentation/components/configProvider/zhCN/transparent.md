# 透明
如果不需要包装DOM，设置为透明。
```html
<n-button @click="theme = 'dark'">深色主题</n-button>
<n-button @click="theme = 'light'">浅色主题</n-button>
<n-config-provider :theme="theme" :theme-environment="env" transparent>
  <n-config-consumer>
    <template v-slot="{ themeEnvironment }">
      无包装DOM: {{ themeEnvironment }}
    </template>
  </n-config-consumer>
</n-config-provider>
```
```js
export default {
  data () {
    return {
      theme: 'light',
      env: {
        dark: '深色 666',
        light: '浅色 666'
      }
    }
  }
}
```