import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { obtenerUsuarios } from "../services/api";

import BottomTabs from "./BottomTabs";
import NewsScreen from "../screens/NewsScreen";
import FantasyScreen from "../screens/FantasyScreen";
import StatsScreen from "../screens/StatsScreen";
import PlayersScreen from "../screens/PlayersScreen";
import SettingsScreen from "../screens/SettingsScreen";

import styles from "../estilos/DrawerStyles";

const Drawer = createDrawerNavigator();

// Items principales (tabs) — solo para resaltar el activo en el drawer
const mainItems = [
  { name: "Inicio",    icon: "home-outline",       iconActive: "home"       },
  { name: "Partidos",  icon: "basketball-outline",  iconActive: "basketball" },
  { name: "Equipos",   icon: "people-outline",      iconActive: "people"     },
  { name: "Perfil",    icon: "person-outline",      iconActive: "person"     },
];

// Items del drawer lateral
const drawerItems = [
  { name: "Noticias",       icon: "newspaper-outline",      iconActive: "newspaper"      },
  { name: "NBA Fantasy",    icon: "trophy-outline",         iconActive: "trophy"         },
  { name: "Estadísticas",   icon: "stats-chart-outline",    iconActive: "stats-chart"    },
  { name: "Jugadores",      icon: "body-outline",           iconActive: "body"           },
  { name: "Configuración",  icon: "settings-outline",       iconActive: "settings"       },
];

function CustomDrawerContent(props) {
  const { state, navigation } = props;
  const insets = useSafeAreaInsets();
  const activeRouteName = state.routeNames[state.index];
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    obtenerUsuarios()
      .then((users) => {
        if (Array.isArray(users) && users.length > 0) {
          setUsuario(users[0]);
        }
      })
      .catch(() => {});
  }, [state]);

  return (
    <View style={[styles.drawerContainer, { paddingBottom: insets.bottom }]}>

      {/* HEADER */}
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={36} color="#ffffff" />
        </View>
        <Text style={styles.drawerUsername}>
          {usuario ? usuario.nombre_usuario : "Fan HoopZone"}
        </Text>
        <Text style={styles.drawerUserTag}>
          {usuario ? `@${usuario.nombre_usuario}` : "@hoopfan_nba"}
        </Text>
      </View>

      <DrawerContentScrollView
        {...props}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* SECCIÓN: PRINCIPAL */}
        <View style={styles.drawerSection}>
          <Text style={styles.drawerSectionLabel}>Principal</Text>

          {mainItems.map((item) => {
            const mainTabState = state.routes.find((r) => r.name === "MainTabs")?.state;
            const currentTabName = mainTabState?.routeNames ? mainTabState.routeNames[mainTabState.index] : "Inicio";
            const isCurrentActive = activeRouteName === "MainTabs" && currentTabName === item.name;

            return (
              <TouchableOpacity
                key={item.name}
                style={[styles.drawerItem, isCurrentActive && styles.drawerItemActive]}
                activeOpacity={0.75}
                onPress={() => navigation.navigate("MainTabs", { screen: item.name })}
              >
                <Ionicons
                  name={isCurrentActive ? item.iconActive : item.icon}
                  size={22}
                  color={isCurrentActive ? "#ffffff" : "#d0d8ff"}
                  style={styles.drawerItemIcon}
                />
                <Text style={[styles.drawerItemLabel, isCurrentActive && styles.drawerItemLabelActive]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.drawerDivider} />

        {/* SECCIÓN: EXPLORAR */}
        <View style={styles.drawerSection}>
          <Text style={styles.drawerSectionLabel}>Explorar</Text>

          {drawerItems.map((item) => {
            const isActive = activeRouteName === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                style={[styles.drawerItem, isActive && styles.drawerItemActive]}
                activeOpacity={0.75}
                onPress={() => navigation.navigate(item.name)}
              >
                <Ionicons
                  name={isActive ? item.iconActive : item.icon}
                  size={22}
                  color={isActive ? "#ffffff" : "#d0d8ff"}
                  style={styles.drawerItemIcon}
                />
                <Text style={[styles.drawerItemLabel, isActive && styles.drawerItemLabelActive]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* FOOTER */}
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterText}>HoopZone v1.0 • NBA 2024-25</Text>
      </View>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen name="MainTabs"      component={BottomTabs}     />
      <Drawer.Screen name="Noticias"      component={NewsScreen}     />
      <Drawer.Screen name="NBA Fantasy"   component={FantasyScreen}  />
      <Drawer.Screen name="Estadísticas"  component={StatsScreen}    />
      <Drawer.Screen name="Jugadores"     component={PlayersScreen}  />
      <Drawer.Screen name="Configuración" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
