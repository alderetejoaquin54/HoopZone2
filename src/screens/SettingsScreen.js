import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/SettingsStyles";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Configuración</Text>
          <Text style={styles.subtitle}>Personalizá tu experiencia</Text>
        </View>

        {/* CONTENIDO PRÓXIMAMENTE */}
        <View style={styles.card}>
          <View style={styles.comingSoonContainer}>
            <Ionicons name="settings-outline" size={56} color="#d0d8ff" />
            <Text style={styles.comingSoonText}>Ajustes de la App</Text>
            <Text style={styles.comingSoonSub}>
              Tema, notificaciones, idioma, privacidad y más opciones de personalización próximamente.
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
