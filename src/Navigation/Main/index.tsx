import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { RecordContainer } from "@/Screens/Record";
import { ChartContainer } from "@/Screens/Chart";
import { MeContainer } from "@/Screens/Me";

import { useDispatch } from "react-redux";
import { setAccessToken, getAccessToken } from "@/Store/reducers";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie'
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson'

const Tab = createBottomTabNavigator();

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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon = faHouse
          if (route.name === "Home") {
            icon = faHouse
          } else if (route.name === "Record") {
            icon = faFile
          } else if (route.name === "Chart") {
            icon = faChartPie
          } else if (route.name === "Me") {
            icon = faPerson
          }
          return <FontAwesomeIcon icon={icon} color={color} />
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
  );
};
