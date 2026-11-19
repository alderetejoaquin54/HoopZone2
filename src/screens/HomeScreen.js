import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/HomeStyles";
import {
  comprobarBackend,
  obtenerPosicionesNBA,
  obtenerPartidosNBA,
} from "../services/api";

export default function HomeScreen({ navigation }) {
  const [selectedConf, setSelectedConf] = useState("este");
  const [conectado, setConectado] = useState(true);
  const [posiciones, setPosiciones] = useState({ este: [], oeste: [] });
  const [partidoDestacado, setPartidoDestacado] = useState(null);
  const [ultimosResultados, setUltimosResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);

    // 1. Comprobar salud del servidor y base de datos
    try {
      const salud = await comprobarBackend();
      setConectado(Boolean(salud.conectado));
    } catch {
      setConectado(false);
    }

    // 2. Cargar tabla de posiciones desde MySQL / API
    try {
      const posData = await obtenerPosicionesNBA();
      if (posData && posData.este && posData.oeste) {
        setPosiciones({
          este: posData.este.slice(0, 5),
          oeste: posData.oeste.slice(0, 5),
        });
      }
    } catch (e) {
      console.log("Error al cargar posiciones en inicio:", e.message);
    }

    // 3. Cargar partidos desde el servidor (BallDontLie / MySQL)
    try {
      const partidosRes = await obtenerPartidosNBA();
      const listaPartidos = partidosRes.datos || [];

      if (listaPartidos.length > 0) {
        // Seleccionar partido destacado: el que esté en vivo, o el próximo más cercano
        const enVivo = listaPartidos.find((p) => p.status === "live");
        const proximo = listaPartidos.find((p) => p.status === "upcoming");
        setPartidoDestacado(enVivo || proximo || listaPartidos[0]);

        // Seleccionar últimos resultados finalizados
        const finalizados = listaPartidos.filter((p) => p.status === "final");
        setUltimosResultados(
          finalizados.length > 0
            ? finalizados.slice(0, 3)
            : listaPartidos.slice(0, 3)
        );
      }
    } catch (e) {
      console.log("Error al cargar partidos en inicio:", e.message);
    } finally {
      setCargando(false);
    }
  };

  const listaActualPosiciones = posiciones[selectedConf] || [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!conectado && (
          <View
            style={{
              backgroundColor: "rgba(198, 40, 40, 0.35)",
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginHorizontal: 18,
              marginTop: 12,
              marginBottom: 4,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#e57373",
            }}
          >
            <Ionicons
              name="cloud-offline-outline"
              size={18}
              color="#e57373"
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: "#ffffff", fontSize: 13, fontWeight: "600" }}>
              Modo sin conexión • Usando datos locales
            </Text>
          </View>
        )}

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

        {/* INDICADOR DE CARGA */}
        {cargando ? (
          <View style={[styles.card, { alignItems: "center", paddingVertical: 30 }]}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: "#ffffff", marginTop: 10, fontSize: 13 }}>
              Cargando información oficial de la NBA...
            </Text>
          </View>
        ) : (
          <>
            {/* PARTIDO DESTACADO DINÁMICO */}
            {partidoDestacado && (
              <View style={styles.featuredCard}>
                <View style={styles.featuredTop}>
                  <View style={styles.featuredTag}>
                    <Ionicons name="star" size={13} color="#ffd54f" />
                    <Text style={styles.featuredTagText}>PARTIDO DESTACADO</Text>
                  </View>
                  <View style={styles.timeBadge}>
                    <Text style={styles.timeBadgeText}>
                      {partidoDestacado.statusLabel || "HOY"}
                    </Text>
                  </View>
                </View>

                {/* ENFRENTAMIENTO */}
                <View style={styles.matchupRow}>
                  {/* EQUIPO VISITA */}
                  <View style={styles.teamBox}>
                    <View style={styles.teamBadge}>
                      <Text style={styles.teamCode}>
                        {partidoDestacado.awayAbbr || "VIS"}
                      </Text>
                    </View>
                    <Text style={styles.teamName} numberOfLines={1}>
                      {partidoDestacado.awayTeam}
                    </Text>
                    <Text style={styles.teamRecord}>
                      {partidoDestacado.awayRecord}
                    </Text>
                    {partidoDestacado.awayScore !== null &&
                      partidoDestacado.awayScore !== undefined && (
                        <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
                          {partidoDestacado.awayScore}
                        </Text>
                      )}
                  </View>

                  {/* VS */}
                  <View style={styles.vsCircle}>
                    <Text style={styles.vsText}>VS</Text>
                  </View>

                  {/* EQUIPO LOCAL */}
                  <View style={styles.teamBox}>
                    <View style={styles.teamBadge}>
                      <Text style={styles.teamCode}>
                        {partidoDestacado.homeAbbr || "LOC"}
                      </Text>
                    </View>
                    <Text style={styles.teamName} numberOfLines={1}>
                      {partidoDestacado.homeTeam}
                    </Text>
                    <Text style={styles.teamRecord}>
                      {partidoDestacado.homeRecord}
                    </Text>
                    {partidoDestacado.homeScore !== null &&
                      partidoDestacado.homeScore !== undefined && (
                        <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
                          {partidoDestacado.homeScore}
                        </Text>
                      )}
                  </View>
                </View>

                {/* LUGAR Y TRANSMISIÓN */}
                <View style={styles.venueBar}>
                  <Ionicons name="location-outline" size={14} color="#ffffff" />
                  <Text style={styles.venueText}>
                    {partidoDestacado.arena || "Estadio NBA"} • {partidoDestacado.broadcast || "League Pass"}
                  </Text>
                </View>

                {/* BOTÓN DE ACCIÓN */}
                <TouchableOpacity
                  style={styles.primaryButton}
                  activeOpacity={0.8}
                  onPress={() => navigation?.navigate && navigation.navigate("Partidos")}
                >
                  <Text style={styles.buttonText}>Ver Todos los Partidos</Text>
                  <Ionicons name="arrow-forward" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            )}

            {/* ÚLTIMOS RESULTADOS DINÁMICOS */}
            {ultimosResultados.length > 0 && (
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

                {ultimosResultados.map((item) => {
                  const awayWin = item.awayScore > item.homeScore;
                  const homeWin = item.homeScore > item.awayScore;

                  return (
                    <View key={item.id} style={styles.resultItem}>
                      <View style={styles.matchScoreInfo}>
                        <View style={styles.teamScoreLine}>
                          <Text
                            style={[
                              styles.scoreTeamName,
                              awayWin && styles.teamWinner,
                            ]}
                            numberOfLines={1}
                          >
                            {item.awayTeam}
                          </Text>
                          <Text
                            style={[
                              styles.scorePoints,
                              awayWin && styles.pointsWinner,
                            ]}
                          >
                            {item.awayScore !== null && item.awayScore !== undefined ? item.awayScore : "-"}
                          </Text>
                        </View>

                        <View style={styles.teamScoreLine}>
                          <Text
                            style={[
                              styles.scoreTeamName,
                              homeWin && styles.teamWinner,
                            ]}
                            numberOfLines={1}
                          >
                            {item.homeTeam}
                          </Text>
                          <Text
                            style={[
                              styles.scorePoints,
                              homeWin && styles.pointsWinner,
                            ]}
                          >
                            {item.homeScore !== null && item.homeScore !== undefined ? item.homeScore : "-"}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.finalBadge}>
                        <Text style={styles.finalText}>
                          {item.status === "final" ? "FINAL" : item.status === "live" ? "EN VIVO" : "HOY"}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {/* CLASIFICACIÓN RÁPIDA (CONFERENCIAS) DINÁMICA */}
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

              {/* FILAS DE POSICIÓN DINÁMICAS */}
              {listaActualPosiciones.length === 0 ? (
                <Text style={{ color: "#d0d8ff", textAlign: "center", paddingVertical: 12 }}>
                  Cargando posiciones de la conferencia...
                </Text>
              ) : (
                listaActualPosiciones.map((team) => (
                  <View key={team.pos || team.id} style={styles.standingRow}>
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

                    <Text style={styles.teamNameTable} numberOfLines={1}>
                      {team.team || team.shortName}
                    </Text>
                    <Text style={styles.recordTextTable}>{team.record}</Text>
                    <View style={styles.playoffDot} />
                  </View>
                ))
              )}
            </View>
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
