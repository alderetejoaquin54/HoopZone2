import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/StatsStyles";
import {
  obtenerPosicionesNBA,
  obtenerLideresEstadisticas,
} from "../services/api";

const CATEGORIAS = [
  { key: "puntos", label: "🏀 Puntos (PTS)", statLabel: "PPG" },
  { key: "asistencias", label: "🎯 Asistencias (AST)", statLabel: "APG" },
  { key: "rebotes", label: "🛡️ Rebotes (REB)", statLabel: "RPG" },
  { key: "triples", label: "🔥 Triples (3PT)", statLabel: "3PM" },
  { key: "bloqueos", label: "🚫 Bloqueos (BLK)", statLabel: "BPG" },
];

export default function StatsScreen() {
  const [seccion, setSeccion] = useState("lideres"); // 'lideres' | 'posiciones'
  const [categoriaLideres, setCategoriaLideres] = useState("puntos");
  const [conferenciaPos, setConferenciaPos] = useState("este"); // 'este' | 'oeste'

  const [lideresData, setLideresData] = useState(null);
  const [posicionesData, setPosicionesData] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setCargando(true);
      const [lideres, posiciones] = await Promise.all([
        obtenerLideresEstadisticas().catch(() => null),
        obtenerPosicionesNBA().catch(() => null),
      ]);

      if (lideres) setLideresData(lideres);
      if (posiciones) setPosicionesData(posiciones);
    } catch (e) {
      console.log("Error al cargar estadísticas:", e.message);
    } finally {
      setCargando(false);
    }
  };

  const categoriaActual = CATEGORIAS.find((c) => c.key === categoriaLideres) || CATEGORIAS[0];
  const listaLideres = lideresData && lideresData[categoriaLideres] ? lideresData[categoriaLideres] : [];
  const listaPosiciones =
    posicionesData && posicionesData[conferenciaPos] ? posicionesData[conferenciaPos] : [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Estadísticas NBA</Text>
          <Text style={styles.subtitle}>Líderes individuales y clasificación oficial</Text>
        </View>

        {/* SELECTOR PRINCIPAL: LÍDERES / POSICIONES */}
        <View style={styles.mainTabContainer}>
          <TouchableOpacity
            style={[styles.mainTab, seccion === "lideres" && styles.mainTabActive]}
            onPress={() => setSeccion("lideres")}
          >
            <Text
              style={[
                styles.mainTabText,
                seccion === "lideres" && styles.mainTabTextActive,
              ]}
            >
              Líderes de la Liga
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mainTab, seccion === "posiciones" && styles.mainTabActive]}
            onPress={() => setSeccion("posiciones")}
          >
            <Text
              style={[
                styles.mainTabText,
                seccion === "posiciones" && styles.mainTabTextActive,
              ]}
            >
              Posiciones (W-L)
            </Text>
          </TouchableOpacity>
        </View>

        {cargando ? (
          <View style={[styles.card, { alignItems: "center", paddingVertical: 40 }]}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: "#ffffff", marginTop: 12 }}>
              Cargando estadísticas...
            </Text>
          </View>
        ) : seccion === "lideres" ? (
          /* ======================================================== */
          /* PANTALLA: LÍDERES DE ESTADÍSTICAS INDIVIDUALES            */
          /* ======================================================== */
          <>
            {/* PILLS HORIZONTALES CON CATEGORÍAS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.pillsScroll}
            >
              {CATEGORIAS.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[styles.pill, categoriaLideres === cat.key && styles.pillActive]}
                  onPress={() => setCategoriaLideres(cat.key)}
                >
                  <Text
                    style={[
                      styles.pillText,
                      categoriaLideres === cat.key && styles.pillTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* TABLA / TARJETA DE LÍDERES */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>
                Top Jugadores • {categoriaActual.label}
              </Text>

              {listaLideres.map((item) => {
                const esOro = item.rank === 1;
                const esPlata = item.rank === 2;
                const esBronce = item.rank === 3;

                return (
                  <View key={item.rank} style={styles.leaderRow}>
                    <View style={styles.leaderLeft}>
                      <View
                        style={[
                          styles.rankBadge,
                          esOro && styles.rankBadgeGold,
                          esPlata && styles.rankBadgeSilver,
                          esBronce && styles.rankBadgeBronze,
                        ]}
                      >
                        <Text
                          style={[
                            styles.rankText,
                            (esOro || esPlata || esBronce) && styles.rankTextDark,
                          ]}
                        >
                          {item.rank}
                        </Text>
                      </View>

                      <View style={styles.leaderInfo}>
                        <Text style={styles.leaderName}>{item.jugador}</Text>
                        <Text style={styles.leaderSub}>
                          {item.equipo} • {item.pos || "NBA"} • {item.pj} PJ
                        </Text>
                      </View>
                    </View>

                    <View style={styles.statBox}>
                      <Text style={styles.statValue}>{item.stat}</Text>
                      <Text style={styles.statLabel}>{categoriaActual.statLabel}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          /* ======================================================== */
          /* PANTALLA: POSICIONES Y RÉCORDS W-L DE EQUIPOS            */
          /* ======================================================== */
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Tabla de Posiciones Oficial</Text>

            {/* SELECTOR CONFERENCIA ESTE / OESTE */}
            <View style={styles.confSelectorRow}>
              <TouchableOpacity
                style={[
                  styles.confButton,
                  conferenciaPos === "este" && styles.confButtonActive,
                ]}
                onPress={() => setConferenciaPos("este")}
              >
                <Text
                  style={[
                    styles.confButtonText,
                    conferenciaPos === "este" && styles.confButtonTextActive,
                  ]}
                >
                  Conferencia Este
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confButton,
                  conferenciaPos === "oeste" && styles.confButtonActive,
                ]}
                onPress={() => setConferenciaPos("oeste")}
              >
                <Text
                  style={[
                    styles.confButtonText,
                    conferenciaPos === "oeste" && styles.confButtonTextActive,
                  ]}
                >
                  Conferencia Oeste
                </Text>
              </TouchableOpacity>
            </View>

            {/* ENCABEZADOS DE TABLA */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeadCol, styles.colRank]}>#</Text>
              <Text style={[styles.tableHeadCol, styles.colTeam]}>Equipo</Text>
              <Text style={[styles.tableHeadCol, styles.colW]}>G</Text>
              <Text style={[styles.tableHeadCol, styles.colL]}>P</Text>
              <Text style={[styles.tableHeadCol, styles.colPct]}>%Vic</Text>
              <Text style={[styles.tableHeadCol, styles.colStreak]}>Racha</Text>
            </View>

            {/* FILAS DE EQUIPOS */}
            {listaPosiciones.map((team) => {
              const esPlayoff = team.pos <= 6;
              const esPlayin = team.pos > 6 && team.pos <= 10;

              return (
                <View
                  key={team.pos}
                  style={[
                    styles.tableRow,
                    esPlayoff && styles.tableRowPlayoff,
                    esPlayin && styles.tableRowPlayin,
                  ]}
                >
                  <Text style={styles.cellRank}>{team.pos}</Text>
                  <Text style={styles.cellTeam} numberOfLines={1}>
                    {team.team}
                  </Text>
                  <Text style={styles.cellW}>{team.victorias}</Text>
                  <Text style={styles.cellL}>{team.derrotas}</Text>
                  <Text style={styles.cellPct}>{team.pct}</Text>
                  <Text
                    style={[
                      styles.cellStreak,
                      team.racha && team.racha.startsWith("P") && { color: "#e57373" },
                    ]}
                  >
                    {team.racha}
                  </Text>
                </View>
              );
            })}

            {/* LEYENDA PLAYOFFS / PLAY-IN */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#4caf50" }]} />
                <Text style={styles.legendText}>Playoffs (1-6)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#ff9800" }]} />
                <Text style={styles.legendText}>Play-In (7-10)</Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
