import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import styles from "../estilos/TeamsStyles";
import {
  obtenerPosicionesNBA,
  obtenerLideresEstadisticas,
} from "../services/api";

const categories = [
  { key: "puntos", label: "Puntos", title: "Puntos por Partido", unit: "PTS" },
  { key: "rebotes", label: "Rebotes", title: "Rebotes por Partido", unit: "REB" },
  { key: "asistencias", label: "Asistencias", title: "Asistencias por Partido", unit: "AST" },
  { key: "triples", label: "Triples", title: "Triples por Partido", unit: "3PM" },
  { key: "bloqueos", label: "Tapones", title: "Tapones por Partido", unit: "TAP" },
];

export default function TeamsScreen() {
  const [conference, setConference] = useState("este");
  const [activeCategory, setActiveCategory] = useState("puntos");
  const [posicionesData, setPosicionesData] = useState({ este: [], oeste: [] });
  const [lideresData, setLideresData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [pos, lid] = await Promise.all([
        obtenerPosicionesNBA().catch(() => null),
        obtenerLideresEstadisticas().catch(() => null),
      ]);

      if (pos) {
        setPosicionesData({
          este: pos.este || [],
          oeste: pos.oeste || [],
        });
      }

      if (lid) {
        setLideresData(lid);
      }
    } catch (e) {
      console.log("Error al cargar equipos y posiciones:", e.message);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  const alRefrescar = () => {
    setRefrescando(true);
    cargarDatos();
  };

  const currentStandings = posicionesData[conference] || [];
  const currentCategoryInfo = categories.find((c) => c.key === activeCategory) || categories[0];
  const currentLeaderPlayers =
    lideresData && lideresData[activeCategory]
      ? lideresData[activeCategory].slice(0, 5)
      : [];

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
          <Text style={styles.title}>NBA Equipos</Text>
          <Text style={styles.subtitle}>Clasificación Oficial • Temporada 2024-25</Text>
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
          {cargando ? (
            <View style={{ alignItems: "center", paddingVertical: 25 }}>
              <ActivityIndicator color="#ffffff" size="small" />
              <Text style={{ color: "#d0d8ff", marginTop: 8, fontSize: 13 }}>
                Cargando clasificación...
              </Text>
            </View>
          ) : currentStandings.length === 0 ? (
            <Text style={{ color: "#d0d8ff", textAlign: "center", paddingVertical: 14 }}>
              No hay datos disponibles en este momento.
            </Text>
          ) : (
            currentStandings.map((item) => {
              const isPlayoffs = item.pos <= 6;
              const isPlayIn = item.pos > 6 && item.pos <= 10;
              const status = isPlayoffs ? "Playoffs" : isPlayIn ? "Play-In" : "-";

              return (
                <View key={item.id || item.pos} style={styles.tableRow}>
                  <Text style={[styles.posText, styles.colPos]}>{item.pos}</Text>
                  <Text
                    style={[styles.teamText, styles.colTeam]}
                    numberOfLines={1}
                  >
                    {item.team || item.shortName}
                  </Text>
                  <Text style={[styles.recordText, styles.colRecord]}>
                    {item.record}
                  </Text>

                  <View style={styles.colBadge}>
                    {status !== "-" ? (
                      <View
                        style={
                          isPlayoffs ? styles.playoffBadge : styles.playInBadge
                        }
                      >
                        <Text style={styles.badgeText}>{status}</Text>
                      </View>
                    ) : (
                      <Text style={{ color: "#d0d8ff", fontSize: 11 }}>-</Text>
                    )}
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* SECCIÓN LÍDERES DE LA LIGA */}
        <View style={styles.header}>
          <Text style={styles.title}>Líderes de la Liga</Text>
          <Text style={styles.subtitle}>Top 5 por estadística individual oficial</Text>
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

        {/* TARJETA TOP 5 LÍDERES DINÁMICA */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{currentCategoryInfo.title}</Text>

          {cargando ? (
            <View style={{ alignItems: "center", paddingVertical: 25 }}>
              <ActivityIndicator color="#ffffff" size="small" />
              <Text style={{ color: "#d0d8ff", marginTop: 8, fontSize: 13 }}>
                Cargando líderes estadísticos...
              </Text>
            </View>
          ) : currentLeaderPlayers.length === 0 ? (
            <Text style={{ color: "#d0d8ff", textAlign: "center", paddingVertical: 14 }}>
              Cargando estadísticas de jugadores...
            </Text>
          ) : (
            currentLeaderPlayers.map((player) => (
              <View key={player.rank} style={styles.leaderRow}>
                <Text style={styles.leaderRank}>{player.rank}</Text>

                <View style={styles.leaderInfo}>
                  <Text style={styles.leaderName}>
                    {player.jugador || player.name}
                  </Text>
                  <Text style={styles.leaderTeam}>
                    {player.equipo || player.team} • {player.pos || "NBA"}
                  </Text>
                </View>

                <View style={styles.leaderStatContainer}>
                  <Text style={styles.leaderStatValue}>
                    {player.stat} {currentCategoryInfo.unit}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
