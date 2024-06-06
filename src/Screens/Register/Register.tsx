import LoginHeader from "@/Components/LoginHeader";
import { setAccessToken, saveAccessToken } from "@/Store/reducers";
import { Button, FormControl, Icon, Input, View } from "native-base";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useRegisterMutation } from "@/Services";
import { RootScreens } from "..";

export const Register = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async () => {
    try {
      const result = await register({
        email,
        password,
        firstName,
        lastName,
        address,
      });
      if ("data" in result) {
        console.log(result.data);
        props.onNavigate(RootScreens.LOGIN);
      }
    } catch (err) {
      console.error("An error occurred during register:", err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <LoginHeader>Register </LoginHeader>
        <FormControl w="90%">
          <FormControl.Label>First Name</FormControl.Label>
          <Input
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="supervised-user-circle" />}
                size={5}
                ml="2"
              />
            }
            placeholder="First Name"
            returnKeyType="next"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            autoCapitalize="none"
          />
          <FormControl.Label>Last Name</FormControl.Label>
          <Input
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="supervised-user-circle" />}
                size={5}
                ml="2"
              />
            }
            placeholder="Last Name"
            returnKeyType="next"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            autoCapitalize="none"
          />
          <FormControl.Label>Address</FormControl.Label>
          <Input
            InputLeftElement={
              <Icon as={<MaterialIcons name="location-on" />} size={5} ml="2" />
            }
            placeholder="Address"
            returnKeyType="done"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
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
