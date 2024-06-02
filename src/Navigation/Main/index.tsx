import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { View, Text, Button } from "react-native"
import { HomeContainer } from "@/Screens/Home";
import { RecordContainer } from "@/Screens/Record";
import { ChartContainer } from "@/Screens/Chart";
import { MeContainer } from "@/Screens/Me";
import { NumberInputModal } from "@/Screens/AddRecord";
import { useNavigation } from '@react-navigation/native'

import { useDispatch } from "react-redux";
import { setAccessToken, getAccessToken } from "@/Store/reducers";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie'
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  NumberInputModal: undefined;
  AddRecord: undefined;
};

export type AddRecordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddRecord'
>;

const AddRecordScreen = () => {
  const navigation = useNavigation<AddRecordScreenNavigationProp>()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button title="Open Number Input" onPress={() => navigation.navigate('NumberInputModal')} />
    </View>
  )
}

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon = faHouse
          let style = {}
          size = 20
          if (route.name === "Home") {
            icon = faHouse
          } else if (route.name === "Record") {
            icon = faFile
          } else if (route.name === "Chart") {
            icon = faChartPie
          } else if (route.name === "Me") {
            icon = faPerson
          } else if (route.name === "AddRecord") {
            icon = faCirclePlus
            size = 40
            style = { marginBottom: -15 }
            color = '#86D09D'
          }
          return <FontAwesomeIcon icon={icon} color={color} size={size} style={style} />
        },
        tabBarActiveTintColor: '#86D09D',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarLabelPosition: "below-icon",
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordContainer}
        options={{
          tabBarLabelPosition: "below-icon",
        }}
      />
      <Tab.Screen 
        name="AddRecord"
        component={AddRecordScreen}
        options={{
          tabBarLabel: ""
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('AddRecordStack')
          }
        })}
      />
      <Tab.Screen
        name="Chart"
        component={ChartContainer}
        options={{
          tabBarLabelPosition: "below-icon",
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeContainer}
        options={{
          tabBarLabelPosition: "below-icon",
        }}
      />
    </Tab.Navigator>
  )
}

// @refresh reset
export const MainNavigator = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await getAccessToken()
      if (token) {
        dispatch(setAccessToken(token))
      }
    }

    initializeAuth()
  }, [dispatch])

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddRecordStack"
        component={AddRecordScreen}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          animation: 'slide_from_bottom',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NumberInputModal"
        component={NumberInputModal}
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
