import { CustomHead } from '../app/components/CustomHead'
import { View, Text, StyleSheet } from 'react-native'
export default function() {
  return (
    <>
      <CustomHead title="My Awesome React App" />
      <View style={styles.container}>
        <Text style={styles.h1}>Hello 🙂</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: '100%' },
  h1: { fontWeight: 'bold', fontSize: 60 }
})
