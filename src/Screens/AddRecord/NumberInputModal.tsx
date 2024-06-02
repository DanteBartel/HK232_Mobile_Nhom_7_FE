import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import CustomNumberKeyboard from '@/Components/CustomNumberKeyboard';
import { useNavigation } from '@react-navigation/native'

export const NumberInputModal = () => {
  const navigation = useNavigation()
  const [inputValue, setInputValue] = useState('');

  const handleNumberPress = (value: string) => {
    setInputValue((prev) => prev + value);
  };

  const handleBackspacePress = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.inputValue}>{inputValue}</Text>
          <CustomNumberKeyboard onPress={handleNumberPress} onBackspace={handleBackspacePress} />
          <Button title="Close" onPress={handleClose} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputValue: {
    fontSize: 32,
    marginBottom: 20,
  },
});