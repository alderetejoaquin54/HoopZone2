import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../estilos/ProfileStyles";
import {
  obtenerUsuarios,
  actualizarUsuario,
  obtenerPreferenciasUsuario,
  obtenerEquiposFavoritos,
  guardarEquipoFavorito,
  obtenerJugadoresFavoritos,
  eliminarJugadorFavorito,
  obtenerEquiposNBA,
} from "../services/api";

export default function ProfileScreen({ navigation }) {
  const [usuario, setUsuario] = useState({
    id: 1,
    nombre_usuario: "usuario_prueba",
    email: "usuario_prueba@example.com",
  });
  const [preferencias, setPreferencias] = useState(null);
  const [equipoFavorito, setEquipoFavorito] = useState("Los Angeles Lakers");
  const [cantEquiposFavs, setCantEquiposFavs] = useState(0);
  const [cantJugadoresFavs, setCantJugadoresFavs] = useState(0);
  const [jugadoresFavoritos, setJugadoresFavoritos] = useState([]);
  const [equiposNBA, setEquiposNBA] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [nombreEditado, setNombreEditado] = useState("");
  const [emailEditado, setEmailEditado] = useState("");
  const [equipoEditado, setEquipoEditado] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Recargar datos cada vez que la pantalla recibe el foco
  useFocusEffect(
    useCallback(() => {
      cargarPerfil();
    }, [])
  );

  useEffect(() => {
    obtenerEquiposNBA()
      .then((res) => {
        if (res && res.datos) setEquiposNBA(res.datos);
      })
      .catch(() => {});
  }, []);

  const cargarPerfil = async () => {
    try {
      const usuarios = await obtenerUsuarios();
      if (Array.isArray(usuarios) && usuarios.length > 0) {
        const u = usuarios[0];
        setUsuario(u);

        // Cargar preferencias del usuario
        try {
          const prefs = await obtenerPreferenciasUsuario(u.id);
          if (prefs) setPreferencias(prefs);
        } catch (e) {
          console.log("Error cargando preferencias:", e.message);
        }

        // Cargar equipo favorito del usuario
        try {
          const favs = await obtenerEquiposFavoritos(u.id);
          if (Array.isArray(favs) && favs.length > 0) {
            setEquipoFavorito(favs[0].equipo_api_id);
            setCantEquiposFavs(favs.length);
          } else {
            setCantEquiposFavs(0);
          }
        } catch (e) {
          console.log("Error cargando equipo favorito:", e.message);
        }

        // Cargar jugadores favoritos del usuario
        try {
          const jugs = await obtenerJugadoresFavoritos(u.id);
          if (Array.isArray(jugs)) {
            setJugadoresFavoritos(jugs);
            setCantJugadoresFavs(jugs.length);
          } else {
            setJugadoresFavoritos([]);
            setCantJugadoresFavs(0);
          }
        } catch (e) {
          console.log("Error cargando jugadores favoritos:", e.message);
        }
      }
    } catch (err) {
      console.log("No se pudo obtener usuario de la API:", err.message);
    }
  };

  const handleEliminarJugadorFavorito = (jugador) => {
    const nombreCompleto =
      jugador.nombre || jugador.apellido
        ? `${jugador.nombre} ${jugador.apellido}`.trim()
        : `Jugador #${jugador.jugador_api_id}`;

    Alert.alert(
      "Eliminar de Favoritos",
      `¿Deseas quitar a ${nombreCompleto} de tus favoritos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const userId = usuario?.id || 1;
            try {
              await eliminarJugadorFavorito(userId, jugador.jugador_api_id);
              setJugadoresFavoritos((prev) =>
                prev.filter((j) => String(j.jugador_api_id) !== String(jugador.jugador_api_id))
              );
              setCantJugadoresFavs((prev) => Math.max(0, prev - 1));
            } catch (error) {
              console.error("Error al eliminar jugador favorito:", error);
              Alert.alert("Error", "No se pudo eliminar el jugador de favoritos.");
            }
          },
        },
      ]
    );
  };

  const abrirModalEdicion = () => {
    const u = usuario || { id: 1, nombre_usuario: "usuario_prueba", email: "usuario_prueba@example.com" };
    setNombreEditado(u.nombre_usuario || "");
    setEmailEditado(u.email || "");
    setEquipoEditado(equipoFavorito || "Los Angeles Lakers");
    setModalVisible(true);
  };

  const guardarCambios = async () => {
    if (!nombreEditado.trim() || !emailEditado.trim()) {
      Alert.alert("Campos requeridos", "Por favor completa el nombre de usuario y el email.");
      return;
    }

    const userId = usuario?.id || 1;

    setGuardando(true);
    try {
      // 1. Guardar usuario
      await actualizarUsuario(userId, {
        nombre_usuario: nombreEditado.trim(),
        email: emailEditado.trim(),
      });

      // 2. Guardar equipo favorito si se especificó
      if (equipoEditado.trim()) {
        await guardarEquipoFavorito(userId, equipoEditado.trim());
        setEquipoFavorito(equipoEditado.trim());
      }

      // Actualizar estado local inmediatamente
      setUsuario({
        id: userId,
        nombre_usuario: nombreEditado.trim(),
        email: emailEditado.trim(),
      });

      setModalVisible(false);
      Alert.alert("Éxito", "¡Perfil actualizado correctamente!");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      Alert.alert("Error", error.message || "No se pudo actualizar el perfil. Intentá nuevamente.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER / AVATAR */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={50} color="#ffffff" />
          </View>
          <Text style={styles.username}>
            {usuario ? usuario.nombre_usuario : "Fan HoopZone"}
          </Text>
          <Text style={styles.userTag}>
            {usuario ? `@${usuario.nombre_usuario}` : "@hoopfan_nba"}
          </Text>
          <Text style={styles.bio}>
            {usuario ? `ID #${usuario.id} • ${usuario.email}` : "Fan de la NBA"}
          </Text>
        </View>

        {/* ESTADÍSTICAS RÁPIDAS DINÁMICAS (DESDE MYSQL) */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{cantEquiposFavs}</Text>
            <Text style={styles.statLabel}>Eq. Favorito</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{cantJugadoresFavs}</Text>
            <Text style={styles.statLabel}>Jug. Favoritos</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {usuario?.activo ? "Activo" : "ID #1"}
            </Text>
            <Text style={styles.statLabel}>Estado Cuenta</Text>
          </View>
        </View>

        {/* MI EQUIPO FAVORITO */}
        <View style={styles.card}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Mi Equipo Favorito</Text>
            <TouchableOpacity onPress={abrirModalEdicion}>
              <Text style={{ color: "#d0d8ff", fontSize: 13, fontWeight: "600" }}>Cambiar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="basketball-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Equipo</Text>
            </View>
            <Text style={styles.rowValue}>{equipoFavorito}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="map-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Liga</Text>
            </View>
            <Text style={styles.rowValue}>NBA</Text>
          </View>

          <View style={styles.rowNoBorder}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="heart-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Estado</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Equipo Principal</Text>
            </View>
          </View>
        </View>

        {/* MIS JUGADORES FAVORITOS */}
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
              Mis Jugadores Favoritos
            </Text>
            <TouchableOpacity onPress={() => navigation && navigation.navigate("Jugadores")}>
              <Text style={{ color: "#d0d8ff", fontSize: 13, fontWeight: "600" }}>
                Buscar más
              </Text>
            </TouchableOpacity>
          </View>

          {jugadoresFavoritos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={32}
                color="#ffffff"
                style={{ opacity: 0.6, marginBottom: 8 }}
              />
              <Text style={styles.emptyText}>
                No tienes jugadores favoritos guardados.
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation && navigation.navigate("Jugadores")}
              >
                <Text style={styles.emptyButtonText}>Explorar Jugadores</Text>
              </TouchableOpacity>
            </View>
          ) : (
            jugadoresFavoritos.map((jugador) => {
              const nombreMostrar =
                jugador.nombre || jugador.apellido
                  ? `${jugador.nombre} ${jugador.apellido}`.trim()
                  : `Jugador #${jugador.jugador_api_id}`;
              const equipoMostrar = jugador.equipo_nombre || "NBA";
              const posMostrar = jugador.posicion ? ` • ${jugador.posicion}` : "";

              return (
                <View key={jugador.jugador_api_id} style={styles.favPlayerRow}>
                  <View style={styles.favPlayerLeft}>
                    <View style={styles.favPlayerAvatar}>
                      <Ionicons name="person" size={18} color="#ffffff" />
                    </View>
                    <View style={styles.favPlayerDetails}>
                      <Text style={styles.favPlayerName} numberOfLines={1}>
                        {nombreMostrar}
                      </Text>
                      <Text style={styles.favPlayerSub} numberOfLines={1}>
                        {equipoMostrar}{posMostrar}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteFavButton}
                    onPress={() => handleEliminarJugadorFavorito(jugador)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="trash-outline" size={18} color="#ffb4b4" />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>

        {/* PREFERENCIAS DEL USUARIO */}
        <View style={styles.card}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Ajustes y Preferencias</Text>
            <TouchableOpacity onPress={() => navigation && navigation.navigate("Configuración")}>
              <Text style={{ color: "#d0d8ff", fontSize: 13, fontWeight: "600" }}>Ajustar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Alertas en vivo</Text>
            </View>
            <Text style={styles.rowValue}>
              {preferencias && preferencias.notificaciones_activadas ? "Activadas" : "Desactivadas"}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="color-palette-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Tema visual</Text>
            </View>
            <Text style={styles.rowValue}>
              {preferencias?.tema === "oscuro"
                ? "Oscuro"
                : preferencias?.tema === "claro"
                ? "Claro"
                : "Sistema"}
            </Text>
          </View>

          <View style={styles.rowNoBorder}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="globe-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Idioma</Text>
            </View>
            <Text style={styles.rowValue}>
              {preferencias?.idioma === "en" ? "English" : "Español"}
            </Text>
          </View>
        </View>

        {/* ACCIONES DE CUENTA */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cuenta</Text>

          <TouchableOpacity style={styles.primaryButton} onPress={abrirModalEdicion}>
            <Ionicons name="create-outline" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Editar Perfil y Equipo</Text>
          </TouchableOpacity>
        </View>

        {/* CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={18} color="#ffffff" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* MODAL PARA EDITAR PERFIL */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Información</Text>

            <Text style={styles.inputLabel}>Nombre de Usuario</Text>
            <TextInput
              style={styles.textInput}
              value={nombreEditado}
              onChangeText={setNombreEditado}
              placeholder="Ej. JuanPerez"
              placeholderTextColor="#8a99cc"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Correo Electrónico</Text>
            <TextInput
              style={styles.textInput}
              value={emailEditado}
              onChangeText={setEmailEditado}
              placeholder="correo@ejemplo.com"
              placeholderTextColor="#8a99cc"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Equipo Favorito (NBA)</Text>
            <TextInput
              style={styles.textInput}
              value={equipoEditado}
              onChangeText={setEquipoEditado}
              placeholder="Buscar equipo (ej. Lakers, Celtics, Warriors)..."
              placeholderTextColor="#8a99cc"
            />

            {/* LISTA FILTRABLE DE EQUIPOS OFICIALES */}
            {equiposNBA.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={true}>
                  {equiposNBA
                    .filter((eq) => {
                      const busq = (equipoEditado || "").trim().toLowerCase();
                      if (!busq) return true;
                      return (
                        (eq.nombre_completo && eq.nombre_completo.toLowerCase().includes(busq)) ||
                        (eq.nombre && eq.nombre.toLowerCase().includes(busq)) ||
                        (eq.abreviatura && eq.abreviatura.toLowerCase().includes(busq))
                      );
                    })
                    .slice(0, 15)
                    .map((eq) => {
                      const esSeleccionado =
                        (equipoEditado || "").trim().toLowerCase() === eq.nombre_completo.toLowerCase();
                      return (
                        <TouchableOpacity
                          key={eq.id}
                          style={[
                            styles.suggestionItem,
                            esSeleccionado && styles.suggestionItemActive,
                          ]}
                          onPress={() => setEquipoEditado(eq.nombre_completo)}
                        >
                          <Text style={styles.suggestionText}>{eq.nombre_completo}</Text>
                          <Text style={styles.suggestionSub}>
                            {eq.abreviatura} • {eq.conferencia}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </View>
            )}

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
                disabled={guardando}
              >
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={guardarCambios}
                disabled={guardando}
              >
                {guardando ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={styles.modalSaveButtonText}>Guardar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
