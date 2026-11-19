import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/FantasyStyles";
import { obtenerUsuarios, obtenerJugadoresFavoritos } from "../services/api";

export default function FantasyScreen({ navigation }) {
  const [jugadoresFavs, setJugadoresFavs] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [usuarioId, setUsuarioId] = useState(1);

  useEffect(() => {
    cargarFantasy();
  }, []);

  const cargarFantasy = async () => {
    try {
      const users = await obtenerUsuarios().catch(() => []);
      const uId = Array.isArray(users) && users.length > 0 ? users[0].id : 1;
      setUsuarioId(uId);

      const favs = await obtenerJugadoresFavoritos(uId);
      setJugadoresFavs(Array.isArray(favs) ? favs : []);
    } catch (e) {
      console.log("Error al cargar fantasy:", e.message);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  const alRefrescar = () => {
    setRefrescando(true);
    cargarFantasy();
  };

  // Calcular puntos fantasy simulados según cantidad de jugadores guardados en la BD
  const totalPuntos = jugadoresFavs.reduce((acc, j, index) => {
    // Estimación dinámica entre 30 y 50 pts por jugador
    const basePts = 35 + ((j.jugador_api_id * 7 + index * 11) % 18);
    return acc + basePts;
  }, 0);

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
          <Text style={styles.title}>NBA Fantasy</Text>
          <Text style={styles.subtitle}>Tu quinteto ideal desde la base de datos</Text>
        </View>

        {cargando ? (
          <View style={[styles.card, { alignItems: "center", paddingVertical: 40 }]}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: "#ffffff", marginTop: 12, fontSize: 13 }}>
              Cargando tu equipo fantasy...
            </Text>
          </View>
        ) : (
          <>
            {/* RESUMEN DE PUNTOS Y PLANTILLA */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Rendimiento de tu Equipo</Text>
              <View style={styles.statsHeader}>
                <View style={styles.statsBox}>
                  <Text style={styles.statsNumber}>{jugadoresFavs.length} / 5</Text>
                  <Text style={styles.statsLabel}>Jugadores</Text>
                </View>
                <View style={styles.statsBox}>
                  <Text style={styles.statsNumber}>{totalPuntos}</Text>
                  <Text style={styles.statsLabel}>Pts Fantasy</Text>
                </View>
                <View style={styles.statsBox}>
                  <Text style={styles.statsNumber}>
                    {jugadoresFavs.length >= 5 ? "#8" : "#24"}
                  </Text>
                  <Text style={styles.statsLabel}>Ranking Liga</Text>
                </View>
              </View>
            </View>

            {/* LISTA DE JUGADORES DEL QUINTETO */}
            <View style={styles.card}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
                  Plantilla Fantasy
                </Text>
                <TouchableOpacity
                  onPress={() => navigation && navigation.navigate("Jugadores")}
                >
                  <Text style={{ color: "#ffd54f", fontSize: 13, fontWeight: "600" }}>
                    + Gestionar
                  </Text>
                </TouchableOpacity>
              </View>

              {jugadoresFavs.length === 0 ? (
                <View style={styles.comingSoonContainer}>
                  <Ionicons name="trophy-outline" size={48} color="#d0d8ff" />
                  <Text style={styles.comingSoonText}>
                    Todavía no agregaste jugadores a tu equipo.
                  </Text>
                  <Text style={styles.comingSoonSub}>
                    Ingresá a la sección "Jugadores", tocá el corazón en tus estrellas favoritas y aparecerán acá en tu quinteto.
                  </Text>
                </View>
              ) : (
                jugadoresFavs.map((j, index) => {
                  const nombreCompleto = `${j.nombre || ""} ${j.apellido || ""}`.trim() || `Jugador #${j.jugador_api_id}`;
                  const equipo = j.equipo_nombre || "NBA";
                  const pos = j.posicion || (index === 0 ? "PG" : index === 1 ? "SG" : index === 2 ? "SF" : index === 3 ? "PF" : "C");
                  const ptsJugador = 35 + ((j.jugador_api_id * 7 + index * 11) % 18);

                  return (
                    <View key={j.jugador_api_id || index} style={styles.playerRow}>
                      <View style={styles.playerPosBadge}>
                        <Text style={styles.playerPosText}>{pos}</Text>
                      </View>

                      <View style={styles.playerInfo}>
                        <Text style={styles.playerName}>{nombreCompleto}</Text>
                        <Text style={styles.playerTeam}>{equipo}</Text>
                      </View>

                      <View style={styles.playerScoreBox}>
                        <Text style={styles.playerScoreText}>{ptsJugador} PTS</Text>
                        <Text style={styles.playerScoreLabel}>Fantasy</Text>
                      </View>
                    </View>
                  );
                })
              )}

              {/* BOTÓN PARA AGREGAR JUGADORES */}
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.8}
                onPress={() => navigation && navigation.navigate("Jugadores")}
              >
                <Ionicons name="add-circle-outline" size={18} color="#ffffff" />
                <Text style={styles.actionButtonText}>
                  {jugadoresFavs.length === 0
                    ? "Elegir mis Jugadores"
                    : "Agregar / Cambiar Jugadores"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
