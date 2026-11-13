import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/FriendsStyles";

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Amigos</Text>
          <Text style={styles.subtitle}>Tu red de fans NBA</Text>
        </View>

        {/* CONTENIDO PRÓXIMAMENTE */}
        <View style={styles.card}>
          <View style={styles.comingSoonContainer}>
            <Ionicons name="people-circle-outline" size={56} color="#d0d8ff" />
            <Text style={styles.comingSoonText}>Social HoopZone</Text>
            <Text style={styles.comingSoonSub}>
              Seguí a tus amigos, comparé predicciones y competí en rankings sociales entre fans.
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
