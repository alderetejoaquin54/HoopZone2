import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import styles from "../estilos/HomeStyles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          {/*
          <Image
           source={require("../../assets/logo.png")}
           style={styles.logo}
          />
          */}
          <Text style={styles.title}>HoopZone</Text>

          <Text style={styles.subtitle}>
            Toda la NBA en un solo lugar
          </Text>
        </View>

        {/* PARTIDO DESTACADO */}
        <View style={styles.featuredCard}>
          <Text style={styles.sectionTitle}>
            Partido Destacado
          </Text>

          <Text style={styles.matchText}>
            Lakers vs Celtics
          </Text>

          <Text style={styles.matchInfo}>
            Hoy - 21:30 hs
          </Text>

          <TouchableOpacity style={styles.redButton}>
            <Text style={styles.buttonText}>
              Ver Detalles
            </Text>
          </TouchableOpacity>
        </View>

        {/* RESULTADOS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Últimos Resultados
          </Text>

          <Text style={styles.result}>
            Knicks 112 - 104 Heat
          </Text>

          <Text style={styles.result}>
            Warriors 120 - 115 Suns
          </Text>

          <Text style={styles.result}>
            Celtics 118 - 110 Bucks
          </Text>
        </View>

        {/* CONFERENCIA ESTE */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Conferencia Este
          </Text>

          <Text style={styles.tableRow}>
            1. Celtics
          </Text>

          <Text style={styles.tableRow}>
            2. Knicks
          </Text>

          <Text style={styles.tableRow}>
            3. Cavaliers
          </Text>

          <Text style={styles.tableRow}>
            4. Bucks
          </Text>
        </View>

        {/* CONFERENCIA OESTE */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Conferencia Oeste
          </Text>

          <Text style={styles.tableRow}>
            1. Nuggets
          </Text>

          <Text style={styles.tableRow}>
            2. Thunder
          </Text>

          <Text style={styles.tableRow}>
            3. Timberwolves
          </Text>

          <Text style={styles.tableRow}>
            4. Mavericks
          </Text>
        </View>
            <View style={{ height: 30 }} />
      </ScrollView>

     

    </View>
  );
}