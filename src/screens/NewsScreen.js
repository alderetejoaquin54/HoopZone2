import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/NewsStyles";
import { obtenerNoticiasNBA } from "../services/api";

export default function NewsScreen() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    try {
      const res = await obtenerNoticiasNBA();
      setNoticias(res.datos || []);
    } catch (e) {
      console.log("Error al cargar noticias:", e.message);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  const alRefrescar = () => {
    setRefrescando(true);
    cargarNoticias();
  };

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
          <Text style={styles.title}>Noticias</Text>
          <Text style={styles.subtitle}>Lo último del mundo NBA oficial</Text>
        </View>

        {cargando ? (
          <View style={[styles.card, { alignItems: "center", paddingVertical: 40 }]}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: "#ffffff", marginTop: 12, fontSize: 13 }}>
              Cargando últimas noticias...
            </Text>
          </View>
        ) : noticias.length === 0 ? (
          <View style={[styles.card, { alignItems: "center", paddingVertical: 30 }]}>
            <Ionicons name="newspaper-outline" size={48} color="#d0d8ff" />
            <Text style={[styles.comingSoonText, { marginTop: 10 }]}>
              No hay noticias disponibles en este momento.
            </Text>
          </View>
        ) : (
          noticias.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.newsCardHeader}>
                <View style={styles.newsCategory}>
                  <Text style={styles.newsCategoryText}>
                    {item.categoria || "NBA"}
                  </Text>
                </View>
                <Text style={styles.newsDate}>
                  📅 {item.fecha || "Reciente"}
                </Text>
              </View>

              <Text style={styles.newsTitle}>{item.titulo}</Text>
              <Text style={styles.newsSummary}>{item.resumen}</Text>

              <View style={styles.newsFooter}>
                <Text style={styles.newsAuthor}>
                  ✍️ {item.autor || "HoopZone"}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="flash" size={14} color="#ffd54f" />
                  <Text style={{ color: "#ffffff", fontSize: 11, marginLeft: 4, fontWeight: "600" }}>
                    Oficial
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}
