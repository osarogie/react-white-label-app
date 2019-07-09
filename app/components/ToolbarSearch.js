import { View, StyleSheet, TextInput } from 'react-native-web'
import { Icon } from 'antd'

export function ToolbarSearch({ style, placeholder }) {
  return (
    <View style={[styles.view, style]}>
      <Icon
        type="search"
        style={{
          color: '#6e534a',
          fontSize: 20,
          marginLeft: 20
        }}
      />
      <TextInput
        style={{
          backgroundColor: '#fff',
          paddingLeft: 20,
          height: 60,
          fontSize: 15,
          flex: 1,
          color: 'rgba(0, 0, 0, 0.3)'
        }}
        placeholder={placeholder}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  }
})
