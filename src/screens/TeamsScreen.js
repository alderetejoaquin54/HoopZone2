import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../estilos/TeamsStyles";

// Equipos clasificados (1-6 Playoffs, 7-10 Play-In)
const standingsData = {
  este: [
    { pos: 1, team: "Boston Celtics", record: "64-18", status: "Playoffs" },
    { pos: 2, team: "New York Knicks", record: "50-32", status: "Playoffs" },
    { pos: 3, team: "Milwaukee Bucks", record: "49-33", status: "Playoffs" },
    { pos: 4, team: "Cleveland Cavaliers", record: "48-34", status: "Playoffs" },
    { pos: 5, team: "Orlando Magic", record: "47-35", status: "Playoffs" },
    { pos: 6, team: "Indiana Pacers", record: "47-35", status: "Playoffs" },
    { pos: 7, team: "Philadelphia 76ers", record: "47-35", status: "Play-In" },
    { pos: 8, team: "Miami Heat", record: "46-36", status: "Play-In" },
    { pos: 9, team: "Chicago Bulls", record: "39-43", status: "Play-In" },
    { pos: 10, team: "Atlanta Hawks", record: "36-46", status: "Play-In" },
  ],
  oeste: [
    { pos: 1, team: "OKC Thunder", record: "57-25", status: "Playoffs" },
    { pos: 2, team: "Denver Nuggets", record: "57-25", status: "Playoffs" },
    { pos: 3, team: "Minnesota Wolves", record: "56-26", status: "Playoffs" },
    { pos: 4, team: "LA Clippers", record: "51-31", status: "Playoffs" },
    { pos: 5, team: "Dallas Mavericks", record: "50-32", status: "Playoffs" },
    { pos: 6, team: "Phoenix Suns", record: "49-33", status: "Playoffs" },
    { pos: 7, team: "New Orleans Pelicans", record: "49-33", status: "Play-In" },
    { pos: 8, team: "Los Angeles Lakers", record: "47-35", status: "Play-In" },
    { pos: 9, team: "Sacramento Kings", record: "46-36", status: "Play-In" },
    { pos: 10, team: "Golden State Warriors", record: "46-36", status: "Play-In" },
  ],
};

// Líderes estadísticos (Top 5 en cada categoría)
const leadersData = {
  puntos: {
    title: "Puntos por Partido",
    unit: "PTS",
    players: [
      { rank: 1, name: "Luka Dončić", team: "Dallas Mavericks", stat: "33.9" },
      { rank: 2, name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", stat: "30.4" },
      { rank: 3, name: "Shai Gilgeous-Alexander", team: "OKC Thunder", stat: "30.1" },
      { rank: 4, name: "Jalen Brunson", team: "New York Knicks", stat: "28.7" },
      { rank: 5, name: "Kevin Durant", team: "Phoenix Suns", stat: "27.1" },
    ],
  },
  rebotes: {
    title: "Rebotes por Partido",
    unit: "REB",
    players: [
      { rank: 1, name: "Domantas Sabonis", team: "Sacramento Kings", stat: "13.7" },
      { rank: 2, name: "Rudy Gobert", team: "Minnesota Timberwolves", stat: "12.9" },
      { rank: 3, name: "Anthony Davis", team: "Los Angeles Lakers", stat: "12.6" },
      { rank: 4, name: "Nikola Jokić", team: "Denver Nuggets", stat: "12.4" },
      { rank: 5, name: "Clint Capela", team: "Atlanta Hawks", stat: "10.6" },
    ],
  },
  asistencias: {
    title: "Asistencias por Partido",
    unit: "AST",
    players: [
      { rank: 1, name: "Tyrese Haliburton", team: "Indiana Pacers", stat: "10.9" },
      { rank: 2, name: "Trae Young", team: "Atlanta Hawks", stat: "10.8" },
      { rank: 3, name: "Luka Dončić", team: "Dallas Mavericks", stat: "9.8" },
      { rank: 4, name: "Nikola Jokić", team: "Denver Nuggets", stat: "9.8" },
      { rank: 5, name: "James Harden", team: "LA Clippers", stat: "8.5" },
    ],
  },
  robos: {
    title: "Robos por Partido",
    unit: "ROB",
    players: [
      { rank: 1, name: "De'Aaron Fox", team: "Sacramento Kings", stat: "2.0" },
      { rank: 2, name: "Shai Gilgeous-Alexander", team: "OKC Thunder", stat: "2.0" },
      { rank: 3, name: "Donovan Mitchell", team: "Cleveland Cavaliers", stat: "1.8" },
      { rank: 4, name: "Alex Caruso", team: "Chicago Bulls", stat: "1.7" },
      { rank: 5, name: "Kawhi Leonard", team: "LA Clippers", stat: "1.6" },
    ],
  },
  tapones: {
    title: "Tapones por Partido",
    unit: "TAP",
    players: [
      { rank: 1, name: "Victor Wembanyama", team: "San Antonio Spurs", stat: "3.6" },
      { rank: 2, name: "Walker Kessler", team: "Utah Jazz", stat: "2.4" },
      { rank: 3, name: "Brook Lopez", team: "Milwaukee Bucks", stat: "2.4" },
      { rank: 4, name: "Anthony Davis", team: "Los Angeles Lakers", stat: "2.3" },
      { rank: 5, name: "Chet Holmgren", team: "OKC Thunder", stat: "2.3" },
    ],
  },
};

const categories = [
  { key: "puntos", label: "Puntos" },
  { key: "rebotes", label: "Rebotes" },
  { key: "asistencias", label: "Asistencias" },
  { key: "robos", label: "Robos" },
  { key: "tapones", label: "Tapones" },
];

export default function TeamsScreen() {
  const [conference, setConference] = useState("este");
  const [activeCategory, setActiveCategory] = useState("puntos");

  const currentStandings = standingsData[conference];
  const currentLeaderData = leadersData[activeCategory];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>NBA Equipos</Text>
          <Text style={styles.subtitle}>Clasificación y Líderes de la Liga</Text>
        </View>

        {/* SELECTOR DE CONFERENCIA */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              conference === "este" && styles.tabButtonActive,
            ]}
            onPress={() => setConference("este")}
          >
            <Text
              style={[
                styles.tabText,
                conference === "este" && styles.tabTextActive,
              ]}
            >
              Conferencia Este
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              conference === "oeste" && styles.tabButtonActive,
            ]}
            onPress={() => setConference("oeste")}
          >
            <Text
              style={[
                styles.tabText,
                conference === "oeste" && styles.tabTextActive,
              ]}
            >
              Conferencia Oeste
            </Text>
          </TouchableOpacity>
        </View>

        {/* TABLA DE CLASIFICACIÓN (PLAYOFFS & PLAY-IN) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Clasificación ({conference === "este" ? "Este" : "Oeste"})
          </Text>

          {/* LEYENDA */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={styles.legendDotGreen} />
              <Text style={styles.legendText}>1-6 Playoffs</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendDotOrange} />
              <Text style={styles.legendText}>7-10 Play-In</Text>
            </View>
          </View>

          {/* ENCABEZADOS DE TABLA */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colPos]}>#</Text>
            <Text style={[styles.tableHeaderText, styles.colTeam]}>Equipo</Text>
            <Text style={[styles.tableHeaderText, styles.colRecord]}>Récord</Text>
            <View style={styles.colBadge}>
              <Text style={styles.tableHeaderText}>Zona</Text>
            </View>
          </View>

          {/* FILAS DE EQUIPOS */}
          {currentStandings.map((item) => {
            const isPlayoffs = item.status === "Playoffs";

            return (
              <View key={item.pos} style={styles.tableRow}>
                <Text style={[styles.posText, styles.colPos]}>{item.pos}</Text>
                <Text
                  style={[styles.teamText, styles.colTeam]}
                  numberOfLines={1}
                >
                  {item.team}
                </Text>
                <Text style={[styles.recordText, styles.colRecord]}>
                  {item.record}
                </Text>

                <View style={styles.colBadge}>
                  <View
                    style={
                      isPlayoffs ? styles.playoffBadge : styles.playInBadge
                    }
                  >
                    <Text style={styles.badgeText}>{item.status}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* SECCIÓN LÍDERES DE LA LIGA */}
        <View style={styles.header}>
          <Text style={styles.title}>Líderes de la Liga</Text>
          <Text style={styles.subtitle}>Top 5 por estadística individual</Text>
        </View>

        {/* SELECTOR DE CATEGORÍA DE LÍDERES */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryChip,
                activeCategory === cat.key && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(cat.key)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === cat.key && styles.categoryChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TARJETA TOP 5 LÍDERES */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{currentLeaderData.title}</Text>

          {currentLeaderData.players.map((player) => (
            <View key={player.rank} style={styles.leaderRow}>
              <Text style={styles.leaderRank}>{player.rank}</Text>

              <View style={styles.leaderInfo}>
                <Text style={styles.leaderName}>{player.name}</Text>
                <Text style={styles.leaderTeam}>{player.team}</Text>
              </View>

              <View style={styles.leaderStatContainer}>
                <Text style={styles.leaderStatValue}>
                  {player.stat} {currentLeaderData.unit}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}