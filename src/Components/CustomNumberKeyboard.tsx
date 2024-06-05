import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0']

interface CustomNumberKeyboardProps {
  onPress: (value: string) => void
  onBackspace: () => void
}

function mapNumbers(numbers: string[], onPress: (value: string) => void, onBackspace: () => void) {
  return (
    numbers.map((number) => (
      <TouchableOpacity key={number} style={styles.numberButton} onPress={() => onPress(number)}>
        <Text style={styles.numberText}>{number}</Text>
      </TouchableOpacity>
    ))
  )
}

const CustomNumberKeyboard: React.FC<CustomNumberKeyboardProps> = ({ onPress, onBackspace }) => {

  const [showPicker, setShowPicker] = useState(false)
  let selectedDate: Date = new Date()

  const onChange = (event: any, date?: Date) => {
    setShowPicker(false)
    if (date) {
      selectedDate = date
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backspaceButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.backspaceText}>Today</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker 
          value={selectedDate || new Date()}
          mode='date'
          display='default'
          onChange={onChange}
        />
      )}
      {selectedDate && (
        <Text style={{ marginTop: 20 }}>Selected Date: {selectedDate.toDateString()}</Text>
      )}
      <View style={styles.numbersContainer}>
        {mapNumbers(numbers, onPress, onBackspace)}
        <TouchableOpacity style={styles.numberButton} onPress={onBackspace}>
          <Text style={styles.numberText}>⌫</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backspaceButton} onPress={onBackspace}>
        <Text style={styles.backspaceText}>Confirm</Text>
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