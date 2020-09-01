# 标签左置
```html
<n-radio-group v-model="size" name="left-size" style="margin-bottom: 12px;">
  <n-radio-button value="small">小</n-radio-button>
  <n-radio-button value="medium" >中</n-radio-button>
  <n-radio-button value="large">大</n-radio-button>
</n-radio-group>
<n-form
  :model="model"
  :rules="rules"
  ref="form"
  label-placement="left"
  label-align="right"
  :label-width="160"
  :size="size"
  :style="{
    maxWidth: '640px'
  }"
>
  <n-form-item-row label="Input" path="inputValue">
    <n-input placeholder="Input" v-model="model.inputValue" />
  </n-form-item-row>
  <n-form-item-row label="Textarea" path="textareaValue">
    <n-input placeholder="Textarea" v-model="model.textareaValue" type="textarea"
      :autosize="{
        minRows: 3,
        maxRows: 5
      }"
    />
  </n-form-item-row>
  <n-form-item-row label="Select" path="selectValue">
    <n-select placeholder="Select" :options="generalOptions" v-model="model.selectValue"/>
  </n-form-item-row>
  <n-form-item-row label="Multiple Select" path="multipleSelectValue">
    <n-select placeholder="Select" :options="generalOptions" v-model="model.multipleSelectValue" multiple/>
  </n-form-item-row>
  <n-form-item-row label="Datetime" path="datetimeValue">
    <n-date-picker type="datetime" v-model="model.datetimeValue"/>
  </n-form-item-row>
  <n-form-item-row label="Switch" path="switchValue">
    <n-switch v-model="model.switchValue" />
  </n-form-item-row>
  <n-form-item-row label="Checkbox Group" path="checkboxGroupValue">
    <n-checkbox-group v-model="model.checkboxGroupValue">
      <n-checkbox value="Option 1">Option 1</n-checkbox>
      <n-checkbox value="Option 2">Option 2</n-checkbox>
      <n-checkbox value="Option 3">Option 3</n-checkbox>
    </n-checkbox-group>
  </n-form-item-row>
  <n-form-item-row label="Radio Group" path="radioGroupValue">
    <n-radio-group v-model="model.radioGroupValue" name="radiogroup1">
      <n-radio value="Radio 1">Radio 1</n-radio>
      <n-radio value="Radio 2">Radio 2</n-radio>
      <n-radio value="Radio 3">Radio 3</n-radio>
    </n-radio-group>
  </n-form-item-row>
  <n-form-item-row label="Radio Button Group" path="radioGroupValue">
    <n-radio-group v-model="model.radioGroupValue" name="radiogroup2">
      <n-radio-button value="Radio 1">Radio 1</n-radio-button>
      <n-radio-button value="Radio 2">Radio 2</n-radio-button>
      <n-radio-button value="Radio 3">Radio 3</n-radio-button>
    </n-radio-group>
  </n-form-item-row>
  <n-form-item-row label="Input Number" path="inputNumberValue">
    <n-input-number v-model="model.inputNumberValue"/>
  </n-form-item-row>
  <n-form-item-row label="Time Picker" path="timePickerValue">
    <n-time-picker v-model="model.timePickerValue" />
  </n-form-item-row>
  <n-form-item-row label="Slider" path="sliderValue">
    <n-slider v-model="model.sliderValue" :step="5"/>
  </n-form-item-row>
  <n-form-item-row label="Transfer" path="transferValue">
    <n-transfer
      v-model="model.transferValue"
      :options="generalOptions"
    />
  </n-form-item-row>
  <n-form-item-row  :gutter="[28, 0]" label="Nested Path">
    <n-row :gutter="[28, 0]" >
      <n-form-item-col :span="12" path="nestedValue.path1">
        <n-input placeholder="Nested Path 1" v-model="model.nestedValue.path1"/>
      </n-form-item-col>
      <n-form-item-col :span="12" path="nestedValue.path2">
        <n-select placeholder="Nested Path 2" :options="generalOptions" v-model="model.nestedValue.path2"/>
      </n-form-item-col>
    </n-row>
  </n-form-item-row>
  <n-row>
    <n-col :span="24">
      <div style="display: flex; justify-content: flex-end;">
        <n-button @click="handleValidateButtonClick" round type="primary">验证</n-button>
      </div>
    </n-col>
  </n-row>
</n-form>

<pre>
{{  JSON.stringify(model, 0, 2) }}
</pre>
```

```js
export default {
  data () {
    return {
      size: 'medium',
      model: {
        inputValue: null,
        textareaValue: null,
        selectValue: null,
        multipleSelectValue: null,
        datetimeValue: null,
        nestedValue: {
          path1: null,
          path2: null
        },
        switchValue: false,
        checkboxGroupValue: null,
        radioGroupValue: null,
        radioButtonGroupValue: null,
        inputNumberValue: null,
        timePickerValue: null,
        sliderValue: 0,
        transferValue: null
      },
      generalOptions: [
        'groode',
        'veli good',
        'emazing',
        'lidiculous'
      ].map(v => ({
        label: v,
        value: v
      })),
      rules: {
        inputValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入 inputValue'
        },
        textareaValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入 textareaValue'
        },
        selectValue: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择 selectValue'
        },
        multipleSelectValue: {
          type: 'array',
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择 multipleSelectValue'
        },
        datetimeValue: {
          type: 'number',
          required: true,
          trigger: ['blur', 'change'],
          message: '请输入 datetimeValue'
        },
        nestedValue: {
          path1: {
            required: true,
            trigger: ['blur', 'input'],
            message: '请输入 nestedValue.path1'
          },
          path2: {
            required: true,
            trigger: ['blur', 'change'],
            message: '请输入 nestedValue.path2'
          }
        },
        checkboxGroupValue: {
          type: 'array',
          required: true,
          trigger: 'change',
          message: '请选择 checkboxGroupValue'
        },
        radioGroupValue: {
          required: true,
          trigger: 'change',
          message: '请选择 radioGroupValue'
        },
        radioButtonGroupValue: {
          required: true,
          trigger: 'change',
          message: '请选择 radioButtonGroupValue'
        },
        inputNumberValue: {
          type: 'number',
          required: true,
          trigger: ['blur', 'change'],
          message: '请输入 inputNumberValue'
        },
        timePickerValue: {
          type: 'number',
          required: true,
          trigger: ['blur', 'change'],
          message: '请输入 timePickerValue'
        },
        sliderValue: 0,
        transferValue: {
          type: 'array',
          required: true,
          trigger: 'change',
          message: '请输入 transferValue'
        }
      }
    }
  },
  methods: {
    handleValidateButtonClick (e) {
      e.preventDefault()
      this.$refs.form.validate(errors => {
        if (!errors) {
          this.$NMessage.success('验证成功')
        } else {
          console.log(errors)
          this.$NMessage.error('验证失败')
        }
      })
    }
  }
}
```