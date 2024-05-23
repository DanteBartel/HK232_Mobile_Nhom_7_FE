import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import {
  Welcome1Container,
  Welcome2Container,
  Welcome3Container,
} from "@/Screens/Welcome";
import { RootScreens } from "@/Screens";
import { LoginContainer } from "@/Screens/Login";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.WELCOME1]: undefined;
  [RootScreens.WELCOME2]: undefined;
  [RootScreens.WELCOME3]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootScreens.WELCOME1}
          component={Welcome1Container}
        />
        <RootStack.Screen
          name={RootScreens.WELCOME2}
          component={Welcome2Container}
        />
        <RootStack.Screen
          name={RootScreens.WELCOME3}
          component={Welcome3Container}
        />
        <RootStack.Screen name={RootScreens.LOGIN} component={LoginContainer} />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
