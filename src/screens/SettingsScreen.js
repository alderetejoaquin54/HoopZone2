import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/SettingsStyles";
import {
  obtenerUsuarios,
  obtenerPreferenciasUsuario,
  actualizarPreferenciasUsuario,
} from "../services/api";

export default function SettingsScreen() {
  const [usuario, setUsuario] = useState({ id: 1, nombre_usuario: "usuario_prueba" });
  const [tema, setTema] = useState("sistema");
  const [idioma, setIdioma] = useState("es");
  const [notificaciones, setNotificaciones] = useState(true);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const usuarios = await obtenerUsuarios();
      if (Array.isArray(usuarios) && usuarios.length > 0) {
        const user = usuarios[0];
        setUsuario(user);

        const prefs = await obtenerPreferenciasUsuario(user.id);
        if (prefs) {
          setTema(prefs.tema || "sistema");
          setIdioma(prefs.idioma || "es");
          setNotificaciones(Boolean(prefs.notificaciones_activadas));
        }
      }
    } catch (error) {
      console.log("Error al cargar configuración:", error.message);
    } finally {
      setCargando(false);
    }
  };

  const guardarConfiguracion = async () => {
    const userId = usuario?.id || 1;

    setGuardando(true);
    setMensajeGuardado(false);

    try {
      await actualizarPreferenciasUsuario(userId, {
        tema,
        idioma,
        notificaciones_activadas: notificaciones ? 1 : 0,
      });

      setMensajeGuardado(true);
      Alert.alert("Éxito", "¡Configuración guardada con éxito!");
      setTimeout(() => setMensajeGuardado(false), 3000);
    } catch (error) {
      console.error("Error al guardar preferencias:", error);
      Alert.alert("Error", error.message || "No se pudieron guardar los ajustes. Intentá de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Configuración</Text>
          <Text style={styles.subtitle}>Personalizá tu experiencia</Text>
        </View>

        {cargando ? (
          <View style={[styles.card, { alignItems: "center", paddingVertical: 40 }]}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: "#ffffff", marginTop: 12 }}>
              Cargando tus ajustes...
            </Text>
          </View>
        ) : (
          <>
            {/* NOTIFICACIONES */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Notificaciones</Text>

              <View style={styles.rowNoBorder}>
                <View style={styles.rowLeft}>
                  <Ionicons
                    name={notificaciones ? "notifications" : "notifications-off-outline"}
                    size={22}
                    color="#ffffff"
                    style={styles.rowIcon}
                  />
                  <View>
                    <Text style={styles.rowLabel}>Alertas en vivo</Text>
                    <Text style={styles.rowSubLabel}>
                      Marcadores y noticias al instante
                    </Text>
                  </View>
                </View>

                <Switch
                  value={notificaciones}
                  onValueChange={setNotificaciones}
                  trackColor={{ false: "rgba(255,255,255,0.2)", true: "rgb(11, 35, 146)" }}
                  thumbColor={notificaciones ? "#ffffff" : "#cccccc"}
                />
              </View>
            </View>

            {/* APARIENCIA / TEMA */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Apariencia</Text>
              <Text style={styles.rowSubLabel}>Elegí el estilo visual de la aplicación</Text>

              <View style={styles.pillGroup}>
                <TouchableOpacity
                  style={[styles.pill, tema === "claro" && styles.pillActive]}
                  onPress={() => setTema("claro")}
                >
                  <Text style={[styles.pillText, tema === "claro" && styles.pillTextActive]}>
                    ☀️ Claro
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.pill, tema === "oscuro" && styles.pillActive]}
                  onPress={() => setTema("oscuro")}
                >
                  <Text style={[styles.pillText, tema === "oscuro" && styles.pillTextActive]}>
                    🌙 Oscuro
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.pill, tema === "sistema" && styles.pillActive]}
                  onPress={() => setTema("sistema")}
                >
                  <Text style={[styles.pillText, tema === "sistema" && styles.pillTextActive]}>
                    ⚙️ Sistema
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* IDIOMA */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Idioma</Text>
              <Text style={styles.rowSubLabel}>Seleccioná tu idioma preferido</Text>

              <View style={styles.pillGroup}>
                <TouchableOpacity
                  style={[styles.pill, idioma === "es" && styles.pillActive]}
                  onPress={() => setIdioma("es")}
                >
                  <Text style={[styles.pillText, idioma === "es" && styles.pillTextActive]}>
                    🇪🇸 Español
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.pill, idioma === "en" && styles.pillActive]}
                  onPress={() => setIdioma("en")}
                >
                  <Text style={[styles.pillText, idioma === "en" && styles.pillTextActive]}>
                    🇺🇸 English
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* BOTÓN GUARDAR AJUSTES */}
            {mensajeGuardado && (
              <Text style={styles.savedStatus}>✓ Ajustes guardados correctamente</Text>
            )}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={guardarConfiguracion}
              disabled={guardando}
            >
              {guardando ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <Ionicons name="save-outline" size={20} color="#ffffff" />
                  <Text style={styles.saveButtonText}>Guardar Configuraciones</Text>
                </>
              )}
            </TouchableOpacity>
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
