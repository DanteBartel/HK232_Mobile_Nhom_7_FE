import { useState } from "react";
import { Login } from "./Login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { emailValidator, passwordValidator } from "@/Utils/validator";
import { InputField } from "@/Config/interface";
import { useLoginMutation } from "@/Services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { userLogin } from "@/Store/reducers";

type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.LOGIN
>;

export const LoginContainer = ({ navigation }: LoginScreenNavigatorProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<InputField>({ value: "", error: "" });
  const [password, setPassword] = useState<InputField>({
    value: "",
    error: "",
  });
  const [login, { data, isLoading, error }] = useLoginMutation();

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    try {
      await login({
        email: email.value,
        password: password.value,
      });
      if (data) {
        const token = data.accessToken;
        await AsyncStorage.setItem("@token", token);
        dispatch(userLogin({ token }));
        navigation.navigate(RootScreens.MAIN);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Login
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={onLoginPressed}
      navigation={navigation}
    />
  );
};
