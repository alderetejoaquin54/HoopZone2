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

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "#ffffff",
    fontSize: 15,
  },

  searchButton: {
    backgroundColor: "#bd0c0cd2",
    borderRadius: 10,
    padding: 8,
    marginLeft: 6,
  },

  playerCard: {
    backgroundColor: "#bd0c0cd2",
    marginHorizontal: 18,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  playerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgb(11, 35, 146)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },

  playerJersey: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },

  playerInfo: {
    flex: 1,
  },

  playerName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
  },

  playerTeam: {
    fontSize: 13,
    color: "#ffffff",
    opacity: 0.9,
    marginTop: 2,
  },

  playerDetails: {
    fontSize: 12,
    color: "#d0d8ff",
    marginTop: 4,
  },

  favButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginLeft: 10,
  },

  loadingBox: {
    paddingVertical: 40,
    alignItems: "center",
  },

  loadingText: {
    color: "#ffffff",
    marginTop: 12,
    fontSize: 14,
  },

  emptyText: {
    color: "#d0d8ff",
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
    paddingHorizontal: 30,
  },
});
