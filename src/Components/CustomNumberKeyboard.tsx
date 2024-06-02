import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

interface CustomNumberKeyboardProps {
  onPress: (value: string) => void
  onBackspace: () => void
}

const CustomNumberKeyboard: React.FC<CustomNumberKeyboardProps> = ({ onPress, onBackspace }) => {
  return (
    <View style={styles.container}>
      <View style={styles.numbersContainer}>
        {numbers.map((number) => (
          <TouchableOpacity key={number} style={styles.numberButton} onPress={() => onPress(number)}>
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.backspaceButton} onPress={onBackspace}>
        <Text style={styles.backspaceText}>⌫</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  numberButton: {
    width: '30%',
    padding: 15,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 20,
  },
  backspaceButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backspaceText: {
    fontSize: 20,
  },
})

export default CustomNumberKeyboard