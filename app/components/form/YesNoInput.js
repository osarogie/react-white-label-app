import { View, Text, StyleSheet } from 'react-native'
import { ToggleButton } from 'react-native-paper'
import { useState, useEffect, memo, forwardRef } from 'react'
import { PRIMARY } from '../../styles/colors'

function compareProps({ value, label, id }, p) {
  return value === p.value && label === p.label && id === p.id
}

const YesText = ({ color }) => <Text style={{ color }}>Yes</Text>
const NoText = ({ color }) => <Text style={{ color }}>No</Text>

export function YesNoInput({ label, value = 'no', onChange }, ref) {
  const isOn = value === 'yes'

  function toggle() {
    const isOn = value === 'yes'
    onChange && onChange(isOn ? 'no' : 'yes')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label} onClick={toggle}>
        {label}
      </Text>
      <View style={styles.toggle}>
        <ToggleButton.Group ref={ref} onValueChange={onChange} value={value}>
          <ToggleButton
            style={{
              width: 72,
              height: 34,
              borderColor: PRIMARY,
              backgroundColor: isOn ? PRIMARY : '#fff'
            }}
            color={isOn ? '#fff' : PRIMARY}
            icon={YesText}
            value="yes"
          />
          <ToggleButton
            style={{
              width: 72,
              height: 34,
              borderColor: PRIMARY,
              backgroundColor: !isOn ? PRIMARY : '#fff'
            }}
            color={!isOn ? '#fff' : PRIMARY}
            icon={NoText}
            value="no"
          />
        </ToggleButton.Group>
      </View>
    </View>
  )
}

YesNoInput = memo(forwardRef(YesNoInput), compareProps)

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginTop: 25, alignItems: 'center' },
  label: { fontSize: 17, color: '#c75b52', flex: 1, cursor: 'pointer' },
  toggle: { flexDirection: 'row' },
  button: {
    width: 72,
    height: 34,
    borderColor: PRIMARY
  }
})
