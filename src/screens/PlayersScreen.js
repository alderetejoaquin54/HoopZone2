
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/PlayersStyles";
import {
  obtenerJugadoresNBA,
  obtenerJugadoresFavoritos,
  guardarJugadorFavorito,
  eliminarJugadorFavorito,
  obtenerUsuarios,
} from "../services/api";

export default function PlayersScreen() {
  const [jugadores, setJugadores] = useState([]);
  const [favoritosIds, setFavoritosIds] = useState(new Set());
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [usuarioId, setUsuarioId] = useState(1);

  useEffect(() => {
    inicializar();
  }, []);

  const inicializar = async () => {
    try {
      const users = await obtenerUsuarios().catch(() => []);
      const idActual = Array.isArray(users) && users.length > 0 ? users[0].id : 1;
      setUsuarioId(idActual);

      // Cargar favoritos del usuario
      cargarFavoritos(idActual);

      // Cargar primeros jugadores (ej. LeBron James por defecto)
      buscar("LeBron");
    } catch (e) {
      console.log("Error inicializando jugadores:", e.message);
    }
  };

  const cargarFavoritos = async (id) => {
    try {
      const favs = await obtenerJugadoresFavoritos(id);
      if (Array.isArray(favs)) {
        const ids = new Set(favs.map((f) => String(f.jugador_api_id)));
        setFavoritosIds(ids);
      }
    } catch (e) {
      console.log("Error al cargar favoritos:", e.message);
    }
  };

  const buscar = async (termino = busqueda) => {
    setCargando(true);
    try {
      const res = await obtenerJugadoresNBA(termino);
      setJugadores(res.datos || []);
    } catch (error) {
      console.error("Error al buscar jugadores:", error.message);
      Alert.alert("Aviso", "No se pudieron cargar los jugadores en este momento. Verificá tu conexión.");
    } finally {
      setCargando(false);
    }
  };

  const toggleFavorito = async (jugador) => {
    const jId = String(jugador.id);
    const esFav = favoritosIds.has(jId);

    try {
      if (esFav) {
        await eliminarJugadorFavorito(usuarioId, jId);
        const nuevosIds = new Set(favoritosIds);
        nuevosIds.delete(jId);
        setFavoritosIds(nuevosIds);
        Alert.alert("Favoritos", `${jugador.first_name || jugador.nombre} se quitó de tus favoritos.`);
      } else {
        await guardarJugadorFavorito(usuarioId, jId, {
          nombre: jugador.first_name || jugador.nombre || "",
          apellido: jugador.last_name || jugador.apellido || "",
          posicion: jugador.position || jugador.posicion || "",
          equipo_nombre: jugador.team?.full_name || jugador.equipo_nombre || "",
        });
        const nuevosIds = new Set(favoritosIds);
        nuevosIds.add(jId);
        setFavoritosIds(nuevosIds);
        Alert.alert("Favoritos", `¡${jugador.first_name || jugador.nombre} agregado a tus favoritos!`);
      }
    } catch (error) {
      console.error("Error al modificar favorito:", error.message);
      Alert.alert("Error", "No se pudo actualizar favoritos. Verificá tu conexión.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Jugadores NBA</Text>
          <Text style={styles.subtitle}>Explorá perfiles y planteles de la liga</Text>
        </View>

        {/* BARRA DE BÚSQUEDA */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#d0d8ff" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar jugador (ej. Curry, Doncic, Tatum)..."
            placeholderTextColor="#8a99cc"
            value={busqueda}
            onChangeText={setBusqueda}
            onSubmitEditing={() => buscar()}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => buscar()}
            disabled={cargando}
          >
            <Ionicons name="arrow-forward" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* LISTA O ESTADO DE CARGA */}
        {cargando ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Buscando jugadores...</Text>
          </View>
        ) : jugadores.length === 0 ? (
          <Text style={styles.emptyText}>
            No se encontraron jugadores. Probá buscando por nombre o apellido.
          </Text>
        ) : (
          jugadores.map((jugador) => {
            const jId = String(jugador.id);
            const esFav = favoritosIds.has(jId);
            const nombreCompleto = `${jugador.first_name || jugador.nombre || ""} ${jugador.last_name || jugador.apellido || ""}`.trim();
            const equipo = jugador.team ? jugador.team.full_name : jugador.equipo_nombre || "Sin equipo";
            const posicion = jugador.position || jugador.posicion || "N/A";
            const numero = jugador.jersey_number || jugador.numero_camiseta || "#";

            return (
              <View key={jugador.id} style={styles.playerCard}>
                <View style={styles.playerLeft}>
                  <View style={styles.avatarBox}>
                    <Text style={styles.playerJersey}>
                      {numero !== "#" && numero !== "-" ? `#${numero}` : "NBA"}
                    </Text>
                  </View>

                  <View style={styles.playerInfo}>
                    <Text style={styles.playerName}>{nombreCompleto}</Text>
                    <Text style={styles.playerTeam}>{equipo}</Text>
                    <Text style={styles.playerDetails}>
                      Posición: {posicion} • {jugador.country || jugador.pais || "USA"}
                    </Text>
                  </View>
                </View>

                {/* BOTÓN FAVORITO */}
                <TouchableOpacity
                  style={styles.favButton}
                  onPress={() => toggleFavorito(jugador)}
                >
                  <Ionicons
                    name={esFav ? "heart" : "heart-outline"}
                    size={24}
                    color={esFav ? "#ff4757" : "#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
