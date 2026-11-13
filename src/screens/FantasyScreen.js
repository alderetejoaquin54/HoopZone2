import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/FantasyStyles";

export default function FantasyScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>NBA Fantasy</Text>
          <Text style={styles.subtitle}>Armá tu equipo ideal</Text>
        </View>

        {/* CONTENIDO PRÓXIMAMENTE */}
        <View style={styles.card}>
          <View style={styles.comingSoonContainer}>
            <Ionicons name="trophy-outline" size={56} color="#d0d8ff" />
            <Text style={styles.comingSoonText}>Fantasy NBA</Text>
            <Text style={styles.comingSoonSub}>
              Elegí tus jugadores, seguí sus estadísticas en vivo y competí contra otros managers de la liga.
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
