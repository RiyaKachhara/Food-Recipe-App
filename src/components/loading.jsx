import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = (props) => {
  return (
    <View  style = {{fllex:1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator {...props}/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})