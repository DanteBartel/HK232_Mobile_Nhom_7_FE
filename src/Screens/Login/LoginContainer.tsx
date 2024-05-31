import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { Login } from "./Login";

type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.LOGIN
>;

export const LoginContainer = ({ navigation }: LoginScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  return <Login onNavigate={onNavigate} />;
};
