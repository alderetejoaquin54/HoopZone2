import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../estilos/ProfileStyles";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER / AVATAR */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={50} color="#ffffff" />
          </View>
          <Text style={styles.username}>Fan HoopZone</Text>
          <Text style={styles.userTag}>@hoopfan_nba</Text>
          <Text style={styles.bio}>
            Apasionado del básquetbol y seguidor fiel de toda la temporada NBA.
          </Text>
        </View>

        {/* ESTADÍSTICAS RÁPIDAS */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Partidos</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1,250</Text>
            <Text style={styles.statLabel}>Pts Fantasy</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>#14</Text>
            <Text style={styles.statLabel}>Ranking</Text>
          </View>
        </View>

        {/* MI EQUIPO FAVORITO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mi Equipo Favorito</Text>

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
            <Text style={styles.rowValue}>Los Angeles Lakers</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="map-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Conferencia</Text>
            </View>
            <Text style={styles.rowValue}>Oeste</Text>
          </View>

          <View style={styles.rowNoBorder}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="trophy-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Posición Actual</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>#3 Oeste</Text>
            </View>
          </View>
        </View>

        {/* PREFERENCIAS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferencias</Text>

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
            <Text style={styles.rowValue}>Activadas</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="newspaper-outline"
                size={20}
                color="#ffffff"
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>Resumen de Jornada</Text>
            </View>
            <Text style={styles.rowValue}>Diario</Text>
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
            <Text style={styles.rowValue}>Español</Text>
          </View>
        </View>

        {/* ACCIONES DE CUENTA */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cuenta</Text>

          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="create-outline" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={18} color="#ffffff" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}