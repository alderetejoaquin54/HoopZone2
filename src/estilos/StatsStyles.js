import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(11, 35, 146)",
  },

  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 15,
    color: "#d0d8ff",
    marginTop: 4,
  },

  // Switch principal de pantallas (Líderes / Posiciones)
  mainTabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginHorizontal: 18,
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },

  mainTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  mainTabActive: {
    backgroundColor: "#bd0c0cd2",
  },

  mainTabText: {
    color: "#d0d8ff",
    fontSize: 14,
    fontWeight: "600",
  },

  mainTabTextActive: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  // Pills de categorías (PTS, AST, REB, 3PT, BLK)
  pillsScroll: {
    paddingHorizontal: 18,
    marginBottom: 16,
  },

  pill: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  pillActive: {
    backgroundColor: "#bd0c0cd2",
    borderColor: "#ffffff",
  },

  pillText: {
    color: "#d0d8ff",
    fontSize: 13,
    fontWeight: "600",
  },

  pillTextActive: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  // Tarjeta contenedora
  card: {
    backgroundColor: "#bd0c0cd2",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 14,
  },

  // Filas de líderes individuales
  leaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },

  leaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  rankBadgeGold: {
    backgroundColor: "#ffd700",
  },

  rankBadgeSilver: {
    backgroundColor: "#c0c0c0",
  },

  rankBadgeBronze: {
    backgroundColor: "#cd7f32",
  },

  rankText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },

  rankTextDark: {
    color: "#000000",
  },

  leaderInfo: {
    flex: 1,
  },

  leaderName: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  leaderSub: {
    color: "#d0d8ff",
    fontSize: 12,
    marginTop: 2,
  },

  statBox: {
    alignItems: "flex-end",
  },

  statValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#d0d8ff",
    fontSize: 11,
  },

  // Selector Conferencia Este / Oeste en Posiciones
  confSelectorRow: {
    flexDirection: "row",
    marginBottom: 14,
    gap: 8,
  },

  confButton: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  confButtonActive: {
    backgroundColor: "rgb(11, 35, 146)",
  },

  confButtonText: {
    color: "#d0d8ff",
    fontSize: 13,
    fontWeight: "600",
  },

  confButtonTextActive: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  // Tabla completa de posiciones
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 4,
  },

  tableHeadCol: {
    color: "#d0d8ff",
    fontSize: 12,
    fontWeight: "bold",
  },

  colRank: {
    width: 26,
    textAlign: "center",
  },

  colTeam: {
    flex: 1,
    paddingLeft: 6,
  },

  colW: {
    width: 34,
    textAlign: "center",
  },

  colL: {
    width: 34,
    textAlign: "center",
  },

  colPct: {
    width: 44,
    textAlign: "center",
  },

  colStreak: {
    width: 38,
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },

  tableRowPlayoff: {
    borderLeftWidth: 3,
    borderLeftColor: "#4caf50",
    paddingLeft: 4,
  },

  tableRowPlayin: {
    borderLeftWidth: 3,
    borderLeftColor: "#ff9800",
    paddingLeft: 4,
  },

  cellRank: {
    width: 24,
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },

  cellTeam: {
    flex: 1,
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    paddingLeft: 6,
  },

  cellW: {
    width: 34,
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },

  cellL: {
    width: 34,
    color: "#d0d8ff",
    fontSize: 13,
    textAlign: "center",
  },

  cellPct: {
    width: 44,
    color: "#d0d8ff",
    fontSize: 12,
    textAlign: "center",
  },

  cellStreak: {
    width: 38,
    color: "#81c784",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    gap: 16,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  legendText: {
    color: "#d0d8ff",
    fontSize: 11,
  },
});
