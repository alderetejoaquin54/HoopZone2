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

  logo: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginBottom: 6,
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

  // TAGS / CHIPS RÁPIDOS
  quickBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    paddingHorizontal: 18,
  },

  quickChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },

  quickChipText: {
    color: "#d0d8ff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 5,
  },

  // PARTIDO DESTACADO
  featuredCard: {
    backgroundColor: "#bd0c0cd2",
    marginHorizontal: 18,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  featuredTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  featuredTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },

  featuredTagText: {
    color: "#ffd54f",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 4,
    letterSpacing: 0.5,
  },

  timeBadge: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  timeBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },

  matchupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  teamBox: {
    alignItems: "center",
    flex: 1,
  },

  teamBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },

  teamCode: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  teamName: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  teamRecord: {
    color: "#d0d8ff",
    fontSize: 12,
    marginTop: 2,
  },

  vsCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  vsText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },

  venueBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 14,
  },

  venueText: {
    color: "#ffffff",
    fontSize: 12,
    marginLeft: 6,
    fontWeight: "500",
  },

  primaryButton: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 6,
  },

  // TARJETAS GENERALES
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

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  titleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 8,
  },

  cardActionText: {
    color: "#d0d8ff",
    fontSize: 12,
    fontWeight: "600",
  },

  // RESULTADOS
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },

  matchScoreInfo: {
    flex: 1,
    paddingRight: 10,
  },

  teamScoreLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },

  scoreTeamName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  teamWinner: {
    fontWeight: "bold",
    color: "#ffffff",
  },

  scorePoints: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 32,
    textAlign: "right",
  },

  pointsWinner: {
    color: "#ffd54f",
  },

  finalBadge: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: "center",
  },

  finalText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },

  // TABS DE CONFERENCIAS
  confTabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
    padding: 3,
    marginBottom: 12,
  },

  confTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },

  confTabActive: {
    backgroundColor: "rgb(11, 35, 146)",
  },

  confTabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#d0d8ff",
  },

  confTabTextActive: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  // TABLA DE POSICIONES
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 4,
  },

  tableHeaderText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#d0d8ff",
  },

  colRank: {
    width: 32,
  },

  colTeam: {
    flex: 1,
  },

  colRecord: {
    width: 60,
    textAlign: "right",
  },

  colStatus: {
    width: 20,
    alignItems: "flex-end",
  },

  standingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },

  rankBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  rankBadgeTop: {
    backgroundColor: "#ffd54f",
  },

  rankText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },

  rankTextTop: {
    color: "#000000",
  },

  teamNameTable: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  recordTextTable: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "500",
    textAlign: "right",
    width: 60,
    marginRight: 6,
  },

  playoffDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2e7d32",
  },
});