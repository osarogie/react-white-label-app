import React from 'react'
import { BrowserLink } from '../link/BrowserLink'
import Popover from 'antd/lib/popover'
import { WHITE, ORANGE } from '../../styles/colors'
import { TouchableOpacity } from 'react-native-web'
import { View, Image, StyleSheet } from 'react-native'
import { ToolbarSearch } from '../ToolbarSearch'
import { Avatar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

export function AppBar() {
  return (
    <View style={styles.container}>
      <View style={styles.leftComponent}>
        <Image
          source={require('../../assets/fastklinik inapp icon@3x.png')}
          style={styles.logo}
        />
      </View>
      <ToolbarSearch placeholder="Search" />
      <Icon
        name="bell"
        size={25}
        style={{
          color: '#333',
          cursor: 'pointer'
        }}
      />
      <View
        style={{
          marginHorizontal: 20,
          height: 30,
          width: 1,
          backgroundColor: '#aaa'
        }}
      />
      <View style={styles.row}>
        <Avatar.Image
          style={{
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            cursor: 'pointer'
          }}
          size={50}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 70,
    boxShadow: '0 3px 8px 0 rgba(62, 100, 146, 0.16)',
    position: 'relative',
    zIndex: 1000,
    paddingHorizontal: 20
  },
  leftComponent: {
    width: 330,
    borderRightColor: '#ddd',
    borderRightWidth: 1
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  logo: { height: 67, width: 86 }
})
