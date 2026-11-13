import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/NewsStyles";

export default function NewsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Noticias</Text>
          <Text style={styles.subtitle}>Lo último de la NBA</Text>
        </View>

        {/* CONTENIDO PRÓXIMAMENTE */}
        <View style={styles.card}>
          <View style={styles.comingSoonContainer}>
            <Ionicons name="newspaper-outline" size={56} color="#d0d8ff" />
            <Text style={styles.comingSoonText}>Noticias NBA</Text>
            <Text style={styles.comingSoonSub}>
              Acá vas a ver las últimas novedades, transferencias y noticias del mundo NBA en tiempo real.
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
