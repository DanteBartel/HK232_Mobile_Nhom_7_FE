import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";

import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTransaction } from "@/Store/reducers";
import { Transaction } from "@/Services";


export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;

  // Test redux
  const dispatch = useDispatch()
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({ type: '', amount: 0 })

  const handleAddTransaction = () => {
    dispatch(addTransaction(newTransaction))
    setNewTransaction({ type: '', amount: 0 })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <>
          <Text>{i18n.t(LocalizationKey.HOME)}</Text>
          <Heading color="primary.500" fontSize="md">
            {data?.username}
          </Heading>

          {/* Test saving transaction into store */}

          <View>
            <Text>Transactions</Text>
            <TextInput
              placeholder="Type"
              value={newTransaction.type}
              onChangeText={(text) => setNewTransaction({ ...newTransaction, type: text })}
            />
            <TextInput
              placeholder="Amount"
              value={newTransaction.amount.toString()}
              onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: Number(text) })}
              keyboardType="numeric"
            />
            <Button title="Add Transaction" onPress={handleAddTransaction} />

          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
