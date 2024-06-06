import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet } from 'react-native';
import { CustomNumberKeyboard } from '@/Components';
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from "react-redux"
import { addTransaction, resetNewTransaction } from "@/Store/reducers"
import { RootState } from '@/Store'
import { usePostTransactionsMutation, Transaction } from "@/Services"

export const NumberInputModal = () => {
  const dispatch = useDispatch()
  const route = useRoute()
  const navigation = useNavigation()
  const newTransaction = useSelector((state: RootState) => state.newTransaction)
  const { category, type } = route.params as { category: string, type: string }
  const [inputValue, setInputValue] = useState('')
  const [note, setNote] = useState('')
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true)
  const [postTransactions, { isLoading }] = usePostTransactionsMutation()

  const handleNumberPress = (value: string) => {
    setInputValue((prev) => prev + value);
  };

  const handleBackspacePress = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleEnter = async () => {
    const transactionData: Omit<Transaction, '_id'> = {
      ...newTransaction,
      amount: Number(inputValue), 
      note: note, 
      category: category, 
      type: type,
    }

    try {
      const result = await postTransactions(transactionData)
      if ("data" in result) {
        const transaction = result.data
        dispatch(addTransaction(transaction))
        dispatch(resetNewTransaction(null))
        navigation.goBack()
      } else {
        console.error("Posting user records failed: ", result.error)
      }
    } catch (err) {
      console.error("An error occurred during posting user records:", err)
    }
  }

  if (isLoading) return (
    <View style={styles.loadingContainer}>
      <Text>Loading transactions...</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.modalContainer}>
          <View style={styles.inputValueBG}>
            <Button title="Close" onPress={handleClose} />
            <Text style={styles.inputValue}>{inputValue}</Text>
          </View>
          <TextInput
            style={styles.noteInput}
            placeholder="Enter note"
            value={note}
            onChangeText={setNote}
            onFocus={() => setIsKeyboardVisible(false)}
            onBlur={() => setIsKeyboardVisible(true)}
          />
          {isKeyboardVisible && (<CustomNumberKeyboard onPress={handleNumberPress} onBackspace={handleBackspacePress} onEnter={handleEnter} />)}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  inputValueBG: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
  },
  inputValue: {
    fontSize: 32,
    marginBottom: 20,
  },
  noteInput: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});