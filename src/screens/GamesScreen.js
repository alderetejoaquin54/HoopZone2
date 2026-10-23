import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../estilos/GamesStyles";

// Datos de partidos (Hoy, Próximos y Finalizados)
const gamesData = {
  hoy: [
    {
      id: 1,
      status: "live",
      statusLabel: "🔴 EN VIVO - Q3 04:15",
      arena: "TD Garden, Boston",
      awayTeam: "L.A. Lakers",
      awayRecord: "47-35",
      awayScore: 78,
      homeTeam: "Boston Celtics",
      homeRecord: "64-18",
      homeScore: 84,
      time: "Q3",
      broadcast: "ESPN / League Pass",
    },
    {
      id: 2,
      status: "upcoming",
      statusLabel: "HOY 21:30 hs",
      arena: "Chase Center, San Francisco",
      awayTeam: "Miami Heat",
      awayRecord: "46-36",
      awayScore: null,
      homeTeam: "Golden State Warriors",
      homeRecord: "46-36",
      homeScore: null,
      time: "21:30",
      broadcast: "NBA TV",
    },
    {
      id: 3,
      status: "upcoming",
      statusLabel: "HOY 23:00 hs",
      arena: "Ball Arena, Denver",
      awayTeam: "Phoenix Suns",
      awayRecord: "49-33",
      awayScore: null,
      homeTeam: "Denver Nuggets",
      homeRecord: "57-25",
      homeScore: null,
      time: "23:00",
      broadcast: "ESPN",
    },
  ],

  proximos: [
    {
      id: 4,
      status: "upcoming",
      statusLabel: "MAÑANA 20:00 hs",
      arena: "Fiserv Forum, Milwaukee",
      awayTeam: "Philadelphia 76ers",
      awayRecord: "47-35",
      awayScore: null,
      homeTeam: "Milwaukee Bucks",
      homeRecord: "49-33",
      homeScore: null,
      time: "20:00",
      broadcast: "TNT",
    },
    {
      id: 5,
      status: "upcoming",
      statusLabel: "MAÑANA 22:30 hs",
      arena: "American Airlines Center",
      awayTeam: "LA Clippers",
      awayRecord: "51-31",
      awayScore: null,
      homeTeam: "Dallas Mavericks",
      homeRecord: "50-32",
      homeScore: null,
      time: "22:30",
      broadcast: "ESPN",
    },
    {
      id: 6,
      status: "upcoming",
      statusLabel: "VIERNES 21:00 hs",
      arena: "Madison Square Garden",
      awayTeam: "Cleveland Cavaliers",
      awayRecord: "48-34",
      awayScore: null,
      homeTeam: "New York Knicks",
      homeRecord: "50-32",
      homeScore: null,
      time: "21:00",
      broadcast: "NBA TV",
    },
    {
      id: 7,
      status: "upcoming",
      statusLabel: "SÁBADO 21:30 hs",
      arena: "Paycom Center",
      awayTeam: "Minnesota Timberwolves",
      awayRecord: "56-26",
      awayScore: null,
      homeTeam: "OKC Thunder",
      homeRecord: "57-25",
      homeScore: null,
      time: "21:30",
      broadcast: "ABC / ESPN",
    },
  ],

  finalizados: [
    {
      id: 8,
      status: "final",
      statusLabel: "FINAL",
      arena: "Gainbridge Fieldhouse",
      awayTeam: "Chicago Bulls",
      awayRecord: "39-43",
      awayScore: 108,
      homeTeam: "Indiana Pacers",
      homeRecord: "47-35",
      homeScore: 114,
      time: "FINAL",
      broadcast: "Finalizado",
    },
    {
      id: 9,
      status: "final",
      statusLabel: "FINAL (TE)",
      arena: "Frost Bank Center",
      awayTeam: "Sacramento Kings",
      awayRecord: "46-36",
      awayScore: 118,
      homeTeam: "San Antonio Spurs",
      homeRecord: "22-60",
      homeScore: 122,
      time: "FINAL",
      broadcast: "Finalizado",
    },
    {
      id: 10,
      status: "final",
      statusLabel: "FINAL",
      arena: "State Farm Arena",
      awayTeam: "Orlando Magic",
      awayRecord: "47-35",
      awayScore: 119,
      homeTeam: "Atlanta Hawks",
      homeRecord: "36-46",
      homeScore: 105,
      time: "FINAL",
      broadcast: "Finalizado",
    },
    {
      id: 11,
      status: "final",
      statusLabel: "FINAL",
      arena: "FedExForum",
      awayTeam: "New Orleans Pelicans",
      awayRecord: "49-33",
      awayScore: 110,
      homeTeam: "Memphis Grizzlies",
      homeRecord: "27-55",
      homeScore: 98,
      time: "FINAL",
      broadcast: "Finalizado",
    },
  ],
};

const tabs = [
  { key: "hoy", label: "Hoy" },
  { key: "proximos", label: "Próximos" },
  { key: "finalizados", label: "Finalizados" },
];

export default function GamesScreen() {
  const [activeTab, setActiveTab] = useState("hoy");

  const currentGames = gamesData[activeTab] || [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Partidos NBA</Text>
          <Text style={styles.subtitle}>Calendario y Resultados</Text>
        </View>

        {/* SELECTOR DE PESTAÑAS (HOY / PRÓXIMOS / FINALIZADOS) */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                activeTab === tab.key && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LISTA DE PARTIDOS */}
        <View style={styles.gamesList}>
          {currentGames.map((game) => {
            const isLive = game.status === "live";
            const isFinal = game.status === "final";
            const isUpcoming = game.status === "upcoming";

            const awayIsWinner =
              isFinal && game.awayScore > game.homeScore;
            const homeIsWinner =
              isFinal && game.homeScore > game.awayScore;

            return (
              <View key={game.id} style={styles.gameCard}>

                {/* ENCABEZADO DE TARJETA */}
                <View style={styles.cardHeader}>
                  <View
                    style={
                      isLive
                        ? styles.statusBadgeLive
                        : isFinal
                        ? styles.statusBadgeFinal
                        : styles.statusBadgeUpcoming
                    }
                  >
                    <Text style={styles.statusText}>{game.statusLabel}</Text>
                  </View>
                  <Text style={styles.arenaText}>{game.arena}</Text>
                </View>

                {/* EQUIPOS Y RESULTADOS */}
                <View style={styles.teamsContainer}>
                  {/* EQUIPO VISITANTE */}
                  <View style={styles.teamBlock}>
                    <Text style={styles.teamName}>{game.awayTeam}</Text>
                    <Text style={styles.teamRecord}>({game.awayRecord})</Text>
                    {game.awayScore !== null && (
                      <Text
                        style={
                          awayIsWinner
                            ? styles.scoreTextWinner
                            : styles.scoreText
                        }
                      >
                        {game.awayScore}
                      </Text>
                    )}
                  </View>

                  {/* VS O TIEMPO */}
                  <View style={styles.vsContainer}>
                    <Text style={styles.vsText}>VS</Text>
                    {isUpcoming && (
                      <Text style={styles.gameTime}>{game.time}</Text>
                    )}
                  </View>

                  {/* EQUIPO LOCAL */}
                  <View style={styles.teamBlock}>
                    <Text style={styles.teamName}>{game.homeTeam}</Text>
                    <Text style={styles.teamRecord}>({game.homeRecord})</Text>
                    {game.homeScore !== null && (
                      <Text
                        style={
                          homeIsWinner
                            ? styles.scoreTextWinner
                            : styles.scoreText
                        }
                      >
                        {game.homeScore}
                      </Text>
                    )}
                  </View>
                </View>

                {/* PIE DE TARJETA */}
                <View style={styles.cardFooter}>
                  <Text style={styles.broadcastText}>📺 {game.broadcast}</Text>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Ver Detalles</Text>
                  </TouchableOpacity>
                </View>

              </View>
            );
          })}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}