import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { useLoginMutation, AuthResponse } from "@/Services";

import { useDispatch } from "react-redux";
import { setAccessToken, saveAccessToken } from "@/Store/reducers";

export const Me = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, isError, data }] = useLoginMutation();

  const handleSubmit = async() => {
    try {
      const result = await login({ email, password })
      if ('data' in result) {
        const authResponse: AuthResponse = result.data
        const token = authResponse.accessToken
        dispatch(setAccessToken(token))
        await saveAccessToken(token)
      } else {
        console.error('Login failed: ', result.error)
      }
    } catch (err) {
      // Login failed
      console.error('An error occurred during login:', err)
    }
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
          <View>
            <View>
              <Text>Email:</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter your email"
              />
            </View>
            <View>
              <Text>Password:</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
              />
            </View>
            {isLoading && <Text>Loading...</Text>}
            {isError && <Text style={{ color: 'red' }}>An error occurred during login</Text>}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              style={{ backgroundColor: isLoading ? 'gray' : 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Log In</Text>
            </TouchableOpacity>
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
