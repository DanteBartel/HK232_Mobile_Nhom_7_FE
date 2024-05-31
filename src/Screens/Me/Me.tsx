import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";

import { useDispatch } from "react-redux";
import { clearAccessToken } from "@/Store/reducers";

export const Me = () => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(clearAccessToken());
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button onPress={handleSubmit}>Log out</Button>
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
