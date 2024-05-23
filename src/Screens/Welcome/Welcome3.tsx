import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import ImageViewer from "@/Components/ImageViewer";
import { RootScreens } from "..";
import { useSelector } from "react-redux";
import { RootState } from "@/Config/interface";

const PlaceholderImage = require("./Shared-goals-bro-1.png");

export const Welcome3 = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.text01}>Tham khảo thu chi từ bạn bè</Text>
        <Text style={styles.text02}>
          Theo dõi bạn bè tiết kiệm hơn nhờ những cửa hàng nào
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Pressable
          style={styles.button01}
          onPress={() => props.onNavigate(RootScreens.WELCOME2)}
        >
          <Text>Back</Text>
        </Pressable>
        <Pressable
          style={styles.button02}
          onPress={() =>
            token
              ? props.onNavigate(RootScreens.MAIN)
              : props.onNavigate(RootScreens.LOGIN)
          }
        >
          <Text>Start</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1.5,
    paddingTop: 50,
  },
  bodyContainer: {
    flex: 1,
  },
  text01: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 20,
  },
  text02: {
    fontSize: 16,
    textAlign: "center",
    paddingLeft: 60,
    paddingRight: 60,
  },
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  button01: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 50,
  },
  button02: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#92E3A9",
  },
});
