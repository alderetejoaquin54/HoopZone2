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

  card: {
    backgroundColor: "#bd0c0cd2",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  comingSoonContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },

  comingSoonText: {
    fontSize: 16,
    color: "#d0d8ff",
    marginTop: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  comingSoonSub: {
    fontSize: 13,
    color: "#d0d8ff",
    marginTop: 8,
    opacity: 0.7,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 14,
  },

  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },

  statsBox: {
    alignItems: "center",
  },

  statsNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffd54f",
  },

  statsLabel: {
    fontSize: 12,
    color: "#d0d8ff",
    marginTop: 2,
  },

  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },

  playerPosBadge: {
    backgroundColor: "rgb(11, 35, 146)",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  playerPosText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },

  playerInfo: {
    flex: 1,
  },

  playerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },

  playerTeam: {
    fontSize: 12,
    color: "#d0d8ff",
    marginTop: 2,
  },

  playerScoreBox: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },

  playerScoreText: {
    color: "#ffd54f",
    fontSize: 14,
    fontWeight: "bold",
  },

  playerScoreLabel: {
    color: "#d0d8ff",
    fontSize: 10,
  },

  actionButton: {
    backgroundColor: "rgb(11, 35, 146)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 14,
  },

  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
