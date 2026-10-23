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

  gamesList: {
    paddingBottom: 20,
  },

  gameCard: {
    backgroundColor: "#bd0c0cd2",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 5,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  statusBadgeLive: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  statusBadgeUpcoming: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  statusBadgeFinal: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffff",
  },

  arenaText: {
    fontSize: 12,
    color: "#d0d8ff",
  },

  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  teamBlock: {
    flex: 1,
    alignItems: "center",
  },

  teamName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },

  teamRecord: {
    fontSize: 11,
    color: "#d0d8ff",
    marginTop: 2,
  },

  scoreText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 6,
  },

  scoreTextWinner: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffd700",
    marginTop: 6,
  },

  vsContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    minWidth: 70,
  },

  vsText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d0d8ff",
  },

  gameTime: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 4,
  },

  cardFooter: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  broadcastText: {
    fontSize: 12,
    color: "#d0d8ff",
  },

  detailsButton: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  detailsButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
});