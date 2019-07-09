import { PRIMARY } from './../styles/colors'
import React from 'react'
import { Spin } from 'antd'
import { View } from 'react-native'
import Head from './head'

export default () => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      justifyContent: 'center'
    }}
  >
    <Head title="Fastklinik" />
    <Spin size="large" color={PRIMARY} />
  </View>
)
