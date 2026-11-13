import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/PlayersStyles";

export default function PlayersScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Jugadores</Text>
          <Text style={styles.subtitle}>Perfiles y estadísticas individuales</Text>
        </View>

        {/* CONTENIDO PRÓXIMAMENTE */}
        <View style={styles.card}>
          <View style={styles.comingSoonContainer}>
            <Ionicons name="body-outline" size={56} color="#d0d8ff" />
            <Text style={styles.comingSoonText}>Base de Jugadores</Text>
            <Text style={styles.comingSoonSub}>
              Buscá cualquier jugador de la NBA, revisá su perfil, historial y estadísticas de temporada.
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
