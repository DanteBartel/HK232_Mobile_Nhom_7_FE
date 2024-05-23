import { Text, View, StyleSheet } from "react-native";
import { RootScreens } from "..";
import { BackButton } from "@/Components/BackButton";
import { RootStackParamList } from "@/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "@/Components/Header";
import { InputField } from "@/Config/interface";
import {
  Button,
  FormControl,
  Icon,
  Input,
  WarningOutlineIcon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/Theme/Variables";

export interface ILoginProps {
  isLoading: boolean;
  email: InputField;
  setEmail: React.Dispatch<React.SetStateAction<InputField>>;
  password: InputField;
  setPassword: React.Dispatch<React.SetStateAction<InputField>>;
  handleLogin: any;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    RootScreens.LOGIN,
    undefined
  >;
}

export const Login = (props: ILoginProps) => {
  const {
    isLoading,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    navigation,
  } = props;
  return (
    <View style={styles.container}>
      {navigation.canGoBack() && <BackButton goBack={navigation.goBack} />}
      <Header>Log In </Header>
      <FormControl w="90%">
        <FormControl.Label>Email</FormControl.Label>
        <Input
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={5} ml="2" />
          }
          placeholder="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
          {email.error}
        </FormControl.ErrorMessage>
        <FormControl.Label>Password</FormControl.Label>
        <Input
          InputLeftElement={
            <Icon as={<MaterialIcons name="lock" />} size={5} ml="2" />
          }
          placeholder="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          secureTextEntry
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon />}>
          {password.error}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        isLoading={isLoading}
        style={styles.button}
        mt={10}
        w={150}
        onPress={handleLogin}
      >
        Log In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 150,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
  },
});
