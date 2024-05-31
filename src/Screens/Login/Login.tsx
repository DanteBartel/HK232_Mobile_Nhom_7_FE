import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FormControl, Icon, Input, Button } from "native-base";
import { useLoginMutation, AuthResponse } from "@/Services";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setAccessToken, saveAccessToken } from "@/Store/reducers";
import LoginHeader from "@/Components/LoginHeader";
import { RootScreens } from "..";

export const Login = (props: any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      const result = await login({ email, password });
      if ("data" in result) {
        const authResponse: AuthResponse = result.data;
        const token = authResponse.accessToken;
        dispatch(setAccessToken(token));
        await saveAccessToken(token);
      } else {
        console.error("Login failed: ", result.error);
      }
    } catch (err) {
      // Login failed
      console.error("An error occurred during login:", err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <LoginHeader>Log In </LoginHeader>
        <FormControl w="90%">
          <FormControl.Label>Email</FormControl.Label>
          <Input
            InputLeftElement={
              <Icon as={<MaterialIcons name="email" />} size={5} ml="2" />
            }
            placeholder="Email"
            returnKeyType="next"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <FormControl.Label>Password</FormControl.Label>
          <Input
            InputLeftElement={
              <Icon as={<MaterialIcons name="lock" />} size={5} ml="2" />
            }
            placeholder="Password"
            returnKeyType="done"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </FormControl>
        <View style={styles.buttonContainer}>
          <Button
            isLoading={isLoading}
            style={styles.button}
            mt={10}
            w={150}
            onPress={handleSubmit}
          >
            Log In
          </Button>
          <Button
            variant="outline"
            isLoading={isLoading}
            style={styles.button}
            mt={10}
            w={150}
            onPress={() => props.onNavigate(RootScreens.REGISTER)}
          >
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 40,
  },
});
