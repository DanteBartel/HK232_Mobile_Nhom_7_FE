import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import { Register } from "./Register";

type RegisterScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.REGISTER
>;

export const RegisterContainer = ({
  navigation,
}: RegisterScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  return <Register onNavigate={onNavigate} />;
};
