import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/HomeStyles";
import { comprobarBackend } from "../services/api";

// Datos de partidos finalizados para el Scoreboard
const recentResults = [
  {
    id: 1,
    teamA: "New York Knicks",
    scoreA: 112,
    teamB: "Miami Heat",
    scoreB: 104,
  },
  {
    id: 2,
    teamA: "Golden State Warriors",
    scoreA: 120,
    teamB: "Phoenix Suns",
    scoreB: 115,
  },
  {
    id: 3,
    teamA: "Boston Celtics",
    scoreA: 118,
    teamB: "Milwaukee Bucks",
    scoreB: 110,
  },
];

// Top 4 de cada conferencia para vista rápida
const conferenceTops = {
  este: [
    { pos: 1, team: "Boston Celtics", record: "64-18" },
    { pos: 2, team: "New York Knicks", record: "50-32" },
    { pos: 3, team: "Cleveland Cavaliers", record: "48-34" },
    { pos: 4, team: "Milwaukee Bucks", record: "49-33" },
  ],
  oeste: [
    { pos: 1, team: "OKC Thunder", record: "57-25" },
    { pos: 2, team: "Denver Nuggets", record: "57-25" },
    { pos: 3, team: "Minnesota Wolves", record: "56-26" },
    { pos: 4, team: "Dallas Mavericks", record: "50-32" },
  ],
};

export default function HomeScreen({ navigation }) {
  const [selectedConf, setSelectedConf] = useState("este");
  const [estadoBackend, setEstadoBackend] = useState("Comprobando conexión...");

useEffect(() => {
  comprobarBackend()
    .then((datos) => {
      setEstadoBackend(
        datos.conectado
          ? `Backend conectado: ${datos.base}`
          : "No se pudo conectar al backend"
      );
    })
    .catch((error) => {
      console.error("Error de conexión:", error.message);
      setEstadoBackend("Backend no disponible");
    });
}, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 12, alignItems: "center" }}>
  <Text style={{ color: "#ffffff" }}>
    {estadoBackend}
  </Text>
</View>

        {/* HEADER CON LOGO */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>HoopZone</Text>
          <Text style={styles.subtitle}>Toda la NBA en un solo lugar</Text>
        </View>

        {/* BARRA RÁPIDA DE ESTADO */}
        <View style={styles.quickBar}>
          <View style={styles.quickChip}>
            <Ionicons name="basketball-outline" size={14} color="#ffd54f" />
            <Text style={styles.quickChipText}>Temporada Regular</Text>
          </View>
          <View style={styles.quickChip}>
            <Ionicons name="flame-outline" size={14} color="#ff8a80" />
            <Text style={styles.quickChipText}>Camino a Playoffs</Text>
          </View>
        </View>

        {/* PARTIDO DESTACADO */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredTop}>
            <View style={styles.featuredTag}>
              <Ionicons name="star" size={13} color="#ffd54f" />
              <Text style={styles.featuredTagText}>PARTIDO DESTACADO</Text>
            </View>
            <View style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>HOY 21:30 hs</Text>
            </View>
          </View>

          {/* ENFRENTAMIENTO */}
          <View style={styles.matchupRow}>
            {/* EQUIPO VISITA */}
            <View style={styles.teamBox}>
              <View style={styles.teamBadge}>
                <Text style={styles.teamCode}>LAL</Text>
              </View>
              <Text style={styles.teamName}>L.A. Lakers</Text>
              <Text style={styles.teamRecord}>47-35</Text>
            </View>

            {/* VS */}
            <View style={styles.vsCircle}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            {/* EQUIPO LOCAL */}
            <View style={styles.teamBox}>
              <View style={styles.teamBadge}>
                <Text style={styles.teamCode}>BOS</Text>
              </View>
              <Text style={styles.teamName}>Celtics</Text>
              <Text style={styles.teamRecord}>64-18</Text>
            </View>
          </View>

          {/* LUGAR Y TRANSMISIÓN */}
          <View style={styles.venueBar}>
            <Ionicons name="location-outline" size={14} color="#ffffff" />
            <Text style={styles.venueText}>TD Garden • ESPN / League Pass</Text>
          </View>

          {/* BOTÓN DE ACCIÓN */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => navigation?.navigate && navigation.navigate("Partidos")}
          >
            <Text style={styles.buttonText}>Ver Partidos de Hoy</Text>
            <Ionicons name="arrow-forward" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* ÚLTIMOS RESULTADOS */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="stats-chart" size={18} color="#ffffff" />
              <Text style={styles.sectionTitle}>Últimos Resultados</Text>
            </View>
            <TouchableOpacity onPress={() => navigation?.navigate && navigation.navigate("Partidos")}>
              <Text style={styles.cardActionText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {recentResults.map((item) => (
            <View key={item.id} style={styles.resultItem}>
              <View style={styles.matchScoreInfo}>
                <View style={styles.teamScoreLine}>
                  <Text
                    style={[
                      styles.scoreTeamName,
                      item.scoreA > item.scoreB && styles.teamWinner,
                    ]}
                  >
                    {item.teamA}
                  </Text>
                  <Text
                    style={[
                      styles.scorePoints,
                      item.scoreA > item.scoreB && styles.pointsWinner,
                    ]}
                  >
                    {item.scoreA}
                  </Text>
                </View>

                <View style={styles.teamScoreLine}>
                  <Text
                    style={[
                      styles.scoreTeamName,
                      item.scoreB > item.scoreA && styles.teamWinner,
                    ]}
                  >
                    {item.teamB}
                  </Text>
                  <Text
                    style={[
                      styles.scorePoints,
                      item.scoreB > item.scoreA && styles.pointsWinner,
                    ]}
                  >
                    {item.scoreB}
                  </Text>
                </View>
              </View>

              <View style={styles.finalBadge}>
                <Text style={styles.finalText}>FINAL</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CLASIFICACIÓN RÁPIDA (CONFERENCIAS) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="trophy" size={18} color="#ffffff" />
              <Text style={styles.sectionTitle}>Líderes de Conferencia</Text>
            </View>
            <TouchableOpacity onPress={() => navigation?.navigate && navigation.navigate("Equipos")}>
              <Text style={styles.cardActionText}>Tabla completa</Text>
            </TouchableOpacity>
          </View>

          {/* SELECTOR ESTE / OESTE */}
          <View style={styles.confTabContainer}>
            <TouchableOpacity
              style={[
                styles.confTab,
                selectedConf === "este" && styles.confTabActive,
              ]}
              onPress={() => setSelectedConf("este")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.confTabText,
                  selectedConf === "este" && styles.confTabTextActive,
                ]}
              >
                Conferencia Este
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.confTab,
                selectedConf === "oeste" && styles.confTabActive,
              ]}
              onPress={() => setSelectedConf("oeste")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.confTabText,
                  selectedConf === "oeste" && styles.confTabTextActive,
                ]}
              >
                Conferencia Oeste
              </Text>
            </TouchableOpacity>
          </View>

          {/* ENCABEZADOS DE MINI TABLA */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colRank]}>#</Text>
            <Text style={[styles.tableHeaderText, styles.colTeam]}>Equipo</Text>
            <Text style={[styles.tableHeaderText, styles.colRecord]}>Récord</Text>
            <Text style={[styles.tableHeaderText, styles.colStatus]}></Text>
          </View>

          {/* FILAS DE POSICIÓN */}
          {conferenceTops[selectedConf].map((team) => (
            <View key={team.pos} style={styles.standingRow}>
              <View
                style={[
                  styles.rankBadge,
                  team.pos === 1 && styles.rankBadgeTop,
                ]}
              >
                <Text
                  style={[
                    styles.rankText,
                    team.pos === 1 && styles.rankTextTop,
                  ]}
                >
                  {team.pos}
                </Text>
              </View>

              <Text style={styles.teamNameTable}>{team.team}</Text>
              <Text style={styles.recordTextTable}>{team.record}</Text>
              <View style={styles.playoffDot} />
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}