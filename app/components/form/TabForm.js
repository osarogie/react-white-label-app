import { AntForm } from './AntForm'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { PRIMARY } from '../../styles/colors'
import { useState } from 'react'

const df = () => undefined

function Tab({ children, active = false, onPress = df }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        styles.tab,
        { backgroundColor: active ? PRIMARY : PRIMARY + '3B' }
      ]}
    >
      <Text style={[styles.tabText, { color: active ? '#fff' : PRIMARY }]}>
        {children}
      </Text>
    </TouchableHighlight>
  )
}

export function TabForm({
  steps = [],
  goBack = df,
  initialPosition = 0,
  dependencyData = {},
  onSubmit
}) {
  const [position, setPosition] = useState(initialPosition)
  const [values, setValues] = useState({})

  const tabs = []
  const forms = []

  function updateValues(v) {
    const isLast = position === steps.length - 1
    const newValues = { ...values, ...v }

    setValues(newValues)

    if (isLast) onSubmit && onSubmit(newValues)
    else setPosition(position + 1)
  }

  steps.forEach(({ label, fields }, index) => {
    const active = index === position
    const isLast = index === steps.length - 1

    tabs.push(
      <Tab key={index} active={active} onPress={() => setPosition(index)}>
        {label}
      </Tab>
    )

    forms.push(
      <View key={index} style={{ display: active ? 'flex' : 'none' }}>
        <AntForm
          dependencyData={dependencyData}
          onSubmit={updateValues}
          submitText={isLast ? 'Save Changes' : 'Next'}
          fields={fields}
        />
      </View>
    )
  })

  return (
    <>
      {/* <div className="tab-div"> */}
      <View style={{ flexDirection: 'row' }}>{tabs}</View>
      <View style={{ backgroundColor: '#fff', paddingHorizontal: 0 }}>
        {forms}
      </View>
      {/* </div> */}
    </>
  )
}

const styles = StyleSheet.create({
  form: {},
  tab: {
    minWidth: 180,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    cursor: 'pointer'
  },
  tabText: {
    fontSize: 17,
    fontWeight: '500',
    color: PRIMARY
  }
})
