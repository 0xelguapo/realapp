import { StyleSheet, View, Text } from 'react-native'
import useCensus from '../../hooks/census-hook'

export default function CensusData({ zipCode }) {
  useCensus('90275')
  return (
    <View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})