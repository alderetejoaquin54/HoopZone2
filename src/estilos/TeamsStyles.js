import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(11, 35, 146)",
  },

  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },

  subtitle: {
    fontSize: 15,
    color: "#d0d8ff",
    marginTop: 4,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginHorizontal: 18,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  tabButtonActive: {
    backgroundColor: "#bd0c0cd2",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d0d8ff",
  },

  tabTextActive: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#bd0c0cd2",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },

  legendContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },

  legendDotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2e7d32",
    marginRight: 6,
  },

  legendDotOrange: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef6c00",
    marginRight: 6,
  },

  legendText: {
    fontSize: 12,
    color: "#ffffff",
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 4,
  },

  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#d0d8ff",
  },

  colPos: {
    width: 30,
  },

  colTeam: {
    flex: 1,
    paddingRight: 6,
  },

  colRecord: {
    width: 55,
    textAlign: "right",
  },

  colBadge: {
    width: 70,
    alignItems: "flex-end",
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },

  posText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },

  teamText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },

  recordText: {
    fontSize: 13,
    color: "#ffffff",
    textAlign: "right",
  },

  playoffBadge: {
    backgroundColor: "#2e7d32",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },

  playInBadge: {
    backgroundColor: "#ef6c00",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },

  categoriesScroll: {
    paddingHorizontal: 18,
    marginBottom: 14,
  },

  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginRight: 8,
  },

  categoryChipActive: {
    backgroundColor: "#ffffff",
  },

  categoryChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#d0d8ff",
  },

  categoryChipTextActive: {
    color: "rgb(11, 35, 146)",
    fontWeight: "bold",
  },

  leaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },

  leaderRank: {
    width: 28,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },

  leaderInfo: {
    flex: 1,
  },

  leaderName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },

  leaderTeam: {
    fontSize: 12,
    color: "#d0d8ff",
    marginTop: 2,
  },

  leaderStatContainer: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    minWidth: 50,
    alignItems: "center",
  },

  leaderStatValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
