import React from "react";
import { StyleSheet, Text } from "react-native";

export default function LoginHeader(props: any) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});
