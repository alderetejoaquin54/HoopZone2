import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import TeamsScreen from "../screens/TeamsScreen";
import GamesScreen from "../screens/GamesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#C9082A",
        tabBarInactiveTintColor: "#777",

        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 6,
        },

        tabBarIcon: ({ color, size }) => {
          let icon;

          if (route.name === "Inicio") icon = "home";
          else if (route.name === "Equipos") icon = "people";
          else if (route.name === "Partidos") icon = "basketball";
          else if (route.name === "Perfil") icon = "person";

          return (
            <Ionicons
              name={icon}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Equipos" component={TeamsScreen} />
      <Tab.Screen name="Partidos" component={GamesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}