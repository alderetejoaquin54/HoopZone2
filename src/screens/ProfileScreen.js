import React from "react";
<<<<<<< HEAD
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/ProfileStyles";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER / AVATAR */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={50} color="#ffffff" />
          </View>
          <Text style={styles.username}>Fan HoopZone</Text>
          <Text style={styles.userTag}>@hoopfan_nba</Text>
          <Text style={styles.bio}>
            Apasionado del básquetbol y seguidor fiel de toda la temporada NBA.
          </Text>
        </View>

        {/* ESTADÍSTICAS RÁPIDAS */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Partidos</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1,250</Text>
            <Text style={styles.statLabel}>Pts Fantasy</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>#14</Text>
            <Text style={styles.statLabel}>Ranking</Text>
          </View>
        </View>

        {/* MI EQUIPO FAVORITO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mi Equipo Favorito</Text>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="basketball-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Equipo</Text>
            </View>
            <Text style={styles.rowValue}>Los Angeles Lakers</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="map-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Conferencia</Text>
            </View>
            <Text style={styles.rowValue}>Oeste</Text>
          </View>

          <View style={styles.rowNoBorder}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="trophy-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Posición Actual</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>#3 Oeste</Text>
            </View>
          </View>
        </View>

        {/* PREFERENCIAS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferencias</Text>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Alertas en vivo</Text>
            </View>
            <Text style={styles.rowValue}>Activadas</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="newspaper-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Resumen de Jornada</Text>
            </View>
            <Text style={styles.rowValue}>Diario</Text>
          </View>

          <View style={styles.rowNoBorder}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="globe-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Idioma</Text>
            </View>
            <Text style={styles.rowValue}>Español</Text>
          </View>
        </View>

        {/* ACCIONES DE CUENTA */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cuenta</Text>

          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="create-outline" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={18} color="#ffffff" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
=======
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3F8",
  },

  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 25,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#17408B",
  },

  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#17408B",
    marginTop: 15,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#17408B",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    color: "#333",
  },

  activityText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },

  blueButton: {
    backgroundColor: "#17408B",
    marginHorizontal: 18,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 12,
  },

  redButton: {
    backgroundColor: "#C9082A",
    marginHorizontal: 18,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 35,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
>>>>>>> 8bc95c120e56159a65ac462d6d56ce4f61826f82
