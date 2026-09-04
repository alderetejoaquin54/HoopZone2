import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "../estilos/GamesStyles";

const games = [
  {
    id: 1,
    time: "19:30",
    status: "UPCOMING",
    home: "Boston Celtics",
    away: "Los Angeles Lakers",
    homeScore: null,
    awayScore: null,
  },
  {
    id: 2,
    time: "21:00",
    status: "UPCOMING",
    home: "Golden State Warriors",
    away: "Miami Heat",
    homeScore: null,
    awayScore: null,
  },
  {
    id: 3,
    time: "FINAL",
    status: "FINAL",
    home: "Denver Nuggets",
    away: "Phoenix Suns",
    homeScore: 112,
    awayScore: 105,
  },
  {
    id: 4,
    time: "22:30",
    status: "UPCOMING",
    home: "Chicago Bulls",
    away: "Philadelphia 76ers",
    homeScore: null,
    awayScore: null,
  },
];

export default function GamesScreen() {
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>GAMES</Text>
        <Text style={styles.subtitle}>NBA Schedule</Text>
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.currentDate}>
          <Text style={styles.dateText}>TODAY</Text>
          <Text style={styles.dateNumber}>AUG 21, 2026</Text>
        </View>

        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gamesContainer}>
        {games.map((game) => (
          <TouchableOpacity key={game.id} style={styles.gameCard}>
            
            <View style={styles.gameHeader}>
              <Text style={styles.status}>{game.status}</Text>
              <Text style={styles.time}>{game.time}</Text>
            </View>

            <View style={styles.teamsContainer}>
              
              <View style={styles.team}>
                <Text style={styles.teamName}>{game.away}</Text>

                {game.awayScore !== null && (
                  <Text style={styles.score}>{game.awayScore}</Text>
                )}
              </View>

              <Text style={styles.vs}>VS</Text>

              <View style={styles.team}>
                <Text style={styles.teamName}>{game.home}</Text>

                {game.homeScore !== null && (
                  <Text style={styles.score}>{game.homeScore}</Text>
                )}
              </View>

            </View>

          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}