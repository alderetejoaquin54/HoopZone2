import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/StatsStyles";

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Estadísticas</Text>
          <Text style={styles.subtitle}>Análisis avanzado de la NBA</Text>
        </View>

        {/* CONTENIDO PRÓXIMAMENTE */}
        <View style={styles.card}>
          <View style={styles.comingSoonContainer}>
            <Ionicons name="stats-chart-outline" size={56} color="#d0d8ff" />
            <Text style={styles.comingSoonText}>Estadísticas Avanzadas</Text>
            <Text style={styles.comingSoonSub}>
              PER, True Shooting, Net Rating, Win Shares y mucho más. El análisis más profundo de la liga.
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
