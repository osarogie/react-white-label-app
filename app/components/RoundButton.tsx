import * as React from 'react'
import { Button, ButtonProps } from 'react-native-paper'
import { Text } from 'react-native'

export function RoundButton(buttonProps: ButtonProps) {
  const { children, style, ...props } = buttonProps
  return (
    // <Button mode="contained" style={[styles.button, style]} {...props}>
    //   {children}
    // </Button>

    React.createElement(
      Button,
      Object.assign(
        {
          mode: 'contained',
          style: [styles.button, style],
          children: React.createElement(Text, {
            style: {
              fontWeight: 'bold',
              color: 'initial'
            },
            children
          })
        },
        props
      )
    )
  )
}

const styles = {
  button: {
    width: 157,
    paddingVertical: 5,
    borderRadius: 25,
    zIndex: 200
  }
}
