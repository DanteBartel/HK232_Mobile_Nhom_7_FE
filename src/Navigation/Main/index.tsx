import React, { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { HomeContainer } from "@/Screens/Home";
import { RecordContainer } from "@/Screens/Record";
import { ChartContainer } from "@/Screens/Chart";
import { MeContainer } from "@/Screens/Me";
import { NumberInputModal } from "@/Screens/AddRecord";
import { AddRecordScreen } from "@/Screens/AddRecord";

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faFile, faChartPie, faPerson, faCirclePlus } from '@/Components'

import { useGetTransactionsMutation, Transaction } from "@/Services"
import { useDispatch } from 'react-redux'
import { resetTransactions, addTransactions } from "@/Store/reducers"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon: IconDefinition = faHouse
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
  const [getTransactions, { isLoading }] = useGetTransactionsMutation()
  const dispatch = useDispatch()

  const fetchTransactions = async () => {
    try {
      const result = await getTransactions()
      dispatch(resetTransactions())
      if ("data" in result) {
        const transactions: Transaction[] = result.data
        dispatch(addTransactions(transactions))
      } else {
        console.error("Getting user records failed: ", result.error)
      }
    } catch (err) {
      console.error("An error occurred during getting user records:", err)
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [])

  if (isLoading) return (
    <View style={styles.loadingContainer}>
      <Text>Loading transactions...</Text>
    </View>
  )

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
          presentation: 'transparentModal',
          gestureEnabled: true,
          animation: 'slide_from_bottom',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
