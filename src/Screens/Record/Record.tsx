import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeTransaction, editTransaction } from "@/Store/reducers";
import { RootState } from "@/Store";
import { Transaction } from "@/Services";

export interface IRecordProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Record = (props: IRecordProps) => {
  const { data, isLoading } = props;

  const transactions = useSelector((state: RootState) => state.transactions)
  const dispatch = useDispatch()

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
          <Text>Record</Text>
          <View>
            <Text>Transactions</Text>
            <View>
              {transactions.allIds.map((id) => {
                const transaction = transactions.byId[id]
                return (
                  <View key={id}>
                    <Text>{transaction.type} - ${transaction.amount}</Text>

                    <Text>Note: {transaction.note} </Text>

                    <Text>Type: {transaction.type} </Text>

                    <Text>Category: {transaction.category} </Text>

                    <Text>Date: {new Date(transaction.transactionDateTime).toISOString().split('T')[0]} </Text>

                    <TouchableOpacity onPress={() => handleRemoveTransaction(id)} style={styles.removeBtn}>
                      <Text>Remove</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleEditTransaction(id, { amount: transaction.amount + 10, type: transaction.type })} style={styles.editBtn}>
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
  removeBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  editBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
});
