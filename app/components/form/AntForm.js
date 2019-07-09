import { PRIMARY } from './../../styles/colors'
import { devLog } from '../../lib/devLog'
import { BLUE } from '../../styles/colors'
import React from 'react'
import Input from 'antd/lib/input/Input'
import Icon from 'antd/lib/icon'
import Form from 'antd/lib/form/Form'
import Button from 'antd/lib/button/button'

import Select from 'antd/lib/select'
import Cascader from 'antd/lib/cascader'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import RadioGroup from 'antd/lib/radio/group'
import RadioButton from 'antd/lib/radio/radioButton'
import InputNumber from 'antd/lib/input-number'
import DatePicker from 'antd/lib/date-picker'
import { countryCodes } from '../../lib/countryCodes'
import { View, Text } from 'react-native'
import { YesNoInput } from './YesNoInput'

const Option = Select.Option

const FormItem = Form.Item

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

export class AntForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        devLog('Received values of form: ', values)
        this.props.onSubmit && this.props.onSubmit(values)
      }
    })
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Your passwords are inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  handleWebsiteChange = value => {
    let autoCompleteResult
    if (!value) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      )
    }
    this.setState({ autoCompleteResult })
  }

  renderField = field_key => {
    const { fields } = this.props
    const { getFieldDecorator } = this.props.form
    let {
      label,
      addonBefore,
      secureEntry,
      icon,
      type,
      rules = [],
      initialValue,
      options,
      mode,
      placeholder,
      min,
      max,
      name
    } = fields[field_key]

    const antFormItem = child => (
      <FormItem key={field_key} {...formItemLayout} label={label}>
        {getFieldDecorator(name || field_key, { rules, initialValue })(child)}
      </FormItem>
    )

    switch (type) {
      case 'text':
        return antFormItem(
          <Input
            placeholder={label}
            addonBefore={addonBefore}
            type={secureEntry ? 'password' : 'text'}
            prefix={
              icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />
            }
          />
        )

      case 'phone': {
        const phonePrefixSelector = getFieldDecorator('prefix', {
          initialValue: '234'
        })(
          <Select style={{ width: 80 }}>
            <Option value="234">+234</Option>
            {countryCodes.map(({ name, code }) => (
              <Option key={name} value={`${code}`}>
                +{code}
              </Option>
            ))}
          </Select>
        )

        return antFormItem(
          <Input addonBefore={phonePrefixSelector} style={{ width: '100%' }} />
        )
      }
      case 'array':
        return antFormItem(<Cascader options={options} />)

      case 'checkbox':
        return (
          <FormItem key={field_key} {...tailFormItemLayout}>
            {getFieldDecorator(field_key, {
              initialValue: initialValue,
              rules: rules,
              valuePropName: 'checked'
            })(<Checkbox>{label}</Checkbox>)}
          </FormItem>
        )

      case 'select': {
        const { dependencyData = {} } = this.props
        const { getFieldsValue } = this.props.form
        const { filter } = fields[field_key]

        if (filter) {
          options = filter(getFieldsValue(), dependencyData).map(
            (dependency, index) => ({
              label: dependency.name,
              value: index
            })
          )
        }

        return antFormItem(
          <Select
            mode={mode}
            showSearch
            optionFilterProp="children"
            placeholder={placeholder}
          >
            {options.map(option => (
              <Option key={option.label} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )
      }

      case 'radio':
        return antFormItem(
          <RadioGroup>
            {options.map(option => (
              <RadioButton key={option.label} value={option.value}>
                {option.label}
              </RadioButton>
            ))}
          </RadioGroup>
        )

      case 'number': {
        initialValue = initialValue !== undefined ? initialValue : 0
        return antFormItem(
          <InputNumber
            size="default"
            min={min !== undefined ? min : 0}
            // max={max || 100000}
          />
        )
      }

      case 'date':
        return antFormItem(<DatePicker size="medium" />)

      case 'break':
        return <div key={label} style={{ height: 20 }} />

      case 'section-head':
        return (
          <div key={label} className="ant-form-item-control-wrapper ant-col-24">
            <div className="ant-form-item-control">
              <span className="ant-form-item-children">
                <span className="ant-input-affix-wrapper">
                  <View style={{ marginTop: 20, marginBottom: 18 }}>
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 17,
                        color: '#6e534a'
                      }}
                    >
                      {label}
                    </Text>
                  </View>
                </span>
              </span>
            </div>
          </div>
        )
      case 'yesno':
        return (
          <FormItem key={field_key} {...formItemLayout}>
            {getFieldDecorator(field_key, {
              initialValue: initialValue,
              rules: rules
            })(<YesNoInput label={label} />)}
          </FormItem>
        )
      default:
        return null
    }
  }

  render() {
    const { fields, onSubmit, submitText, style, big } = this.props

    return (
      <Form
        className={big ? 'big' : ''}
        style={{
          position: 'relative',
          // backgroundColor: '#fff',
          // padding: 20,
          // // width: 500,
          // borderRadius: 6,
          ...style
        }}
        onSubmit={this.handleSubmit}
      >
        <h2>{this.props.title}</h2>
        {this.props.topContent}

        {Object.keys(fields || {}).map((f, i, a) => {
          if (!fields[f].removable) return this.renderField(f, i, a)

          return (
            <div key={f} style={{ flexDirection: 'row', flex: 1 }}>
              {this.renderField(f, i, a)}
              <div
                style={{
                  height: '100%',
                  fontSize: 20,
                  marginLeft: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                  backgroundColor: '#eee',
                  borderRadius: 8
                }}
              >
                X
              </div>
            </div>
          )
        })}
        {onSubmit && (
          <div style={{ display: 'block', width: '100%', float: 'left' }}>
            <Button
              className="button"
              type="primary"
              style={{
                backgroundColor: PRIMARY,
                border: 'none',
                borderRadius: 4,
                display: 'table',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
              htmlType="submit"
            >
              {submitText || 'Submit'}
            </Button>
          </div>
        )}
        {this.props.bottomContent}
      </Form>
    )
  }
}

AntForm = Form.create()(AntForm)
