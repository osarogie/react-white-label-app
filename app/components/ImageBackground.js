import { View, StyleSheet, Image, Text, ScrollView } from 'react-native-web'
import { useState } from 'react'

export function ImageBackground({ children, style, source, height = 200 }) {
  const [imageHeight, setImageHeight] = useState(0)

  function onImageLayout({
    nativeEvent: {
      layout: { x, y, width }
    }
  }) {
    setImageHeight((width * height) / 1366)
  }

  return (
    <View style={[styles.view, style]}>
      <View style={styles.absolute}>
        <Image
          style={[styles.image, { height: imageHeight }]}
          onLayout={onImageLayout}
          source={source}
        />
      </View>
      <View style={{ zIndex: 10 }}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    // maxWidth: 1300
  },
  absolute: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  view: {
    position: 'relative',
    overflow: 'hidden'
  }
})
