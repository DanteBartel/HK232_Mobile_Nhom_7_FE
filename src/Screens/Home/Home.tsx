import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addTransaction, removeTransaction, editTransaction } from "@/Store/reducers";
import { RootState } from "@/Store";
import { Transaction } from "@/Services";


export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;

  // Test redux
  const transactions = useSelector((state: RootState) => state.transactions)
  const dispatch = useDispatch()
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({ type: '', amount: 0 })

  const handleAddTransaction = () => {
    dispatch(addTransaction(newTransaction))
    setNewTransaction({ type: '', amount: 0 })
  }

  const handleRemoveTransaction = (id: number) => {
    dispatch(removeTransaction(id))
  }

  const handleEditTransaction = (id: number, changes: Pick<Transaction, 'amount' | 'type'>) => {
    dispatch(editTransaction({ id, ...changes}))
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

            <View>
              {transactions.allIds.map((id) => {
                const transaction = transactions.byId[id]
                return (
                  <View key={id}>
                    <Text>{transaction.type} - ${transaction.amount}</Text>

                    <TouchableOpacity onPress={() => handleRemoveTransaction(id)}>
                      <Text>Remove</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleEditTransaction(id, { amount: transaction.amount + 10, type: transaction.type })}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
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
