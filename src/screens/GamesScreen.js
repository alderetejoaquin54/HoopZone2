import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import styles from "../estilos/GamesStyles";
import { obtenerPartidosNBA } from "../services/api";

const tabs = [
  { key: "hoy", label: "Hoy" },
  { key: "proximos", label: "Próximos" },
  { key: "finalizados", label: "Finalizados" },
];

export default function GamesScreen() {
  const [activeTab, setActiveTab] = useState("hoy");
  const [partidosPorCategoria, setPartidosPorCategoria] = useState({
    hoy: [],
    proximos: [],
    finalizados: [],
  });
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  useEffect(() => {
    cargarPartidos();
  }, []);

  const cargarPartidos = async () => {
    try {
      const res = await obtenerPartidosNBA();
      const rawGames = res.datos || [];

      const hoy = [];
      const proximos = [];
      const finalizados = [];

      rawGames.forEach((g) => {
        if (g.status === "live") {
          hoy.push(g);
        } else if (g.status === "final") {
          finalizados.push(g);
        } else {
          // Partidos programados: si son para hoy van a 'hoy', sino a 'proximos'
          const label = (g.statusLabel || "").toUpperCase();
          if (label.includes("HOY") || label.includes("VIVO")) {
            hoy.push(g);
          } else {
            proximos.push(g);
          }
        }
      });

      // Si hoy no tiene partidos específicos programados pero hay próximos, mostrar los primeros en 'hoy'
      if (hoy.length === 0 && proximos.length > 0) {
        hoy.push(proximos[0]);
      }

      setPartidosPorCategoria({ hoy, proximos, finalizados });
    } catch (e) {
      console.log("Error al cargar partidos:", e.message);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  const alRefrescar = () => {
    setRefrescando(true);
    cargarPartidos();
  };

  const listaActual = partidosPorCategoria[activeTab] || [];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refrescando}
            onRefresh={alRefrescar}
            tintColor="#ffffff"
          />
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Partidos NBA</Text>
          <Text style={styles.subtitle}>Calendario y Resultados Oficiales</Text>
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

        {/* ESTADO DE CARGA */}
        {cargando ? (
          <View style={[styles.gameCard, { alignItems: "center", paddingVertical: 40 }]}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: "#ffffff", marginTop: 12, fontSize: 13 }}>
              Cargando partidos de la NBA...
            </Text>
          </View>
        ) : listaActual.length === 0 ? (
          <View style={[styles.gameCard, { alignItems: "center", paddingVertical: 30 }]}>
            <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "600" }}>
              No hay partidos en esta categoría en este momento.
            </Text>
          </View>
        ) : (
          /* LISTA DE PARTIDOS */
          <View style={styles.gamesList}>
            {listaActual.map((game) => {
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
                      <Text style={styles.teamName} numberOfLines={2}>
                        {game.awayTeam}
                      </Text>
                      <Text style={styles.teamRecord}>({game.awayRecord})</Text>
                      {game.awayScore !== null && game.awayScore !== undefined && (
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
                      <Text style={styles.teamName} numberOfLines={2}>
                        {game.homeTeam}
                      </Text>
                      <Text style={styles.teamRecord}>({game.homeRecord})</Text>
                      {game.homeScore !== null && game.homeScore !== undefined && (
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
                    <View style={styles.detailsButton}>
                      <Text style={styles.detailsButtonText}>
                        {isLive ? "EN JUEGO" : isFinal ? "FINALIZADO" : "PROGRAMADO"}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
