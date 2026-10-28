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

  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#bd0c0cd2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
    marginBottom: 12,
    elevation: 4,
  },

  username: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
  },

  userTag: {
    fontSize: 14,
    color: "#d0d8ff",
    marginTop: 2,
  },

  bio: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 24,
    opacity: 0.9,
  },

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#bd0c0cd2",
    marginHorizontal: 18,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 18,
    elevation: 5,
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },

  statLabel: {
    fontSize: 12,
    color: "#f0f0f0",
    marginTop: 2,
  },

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },

  card: {
    backgroundColor: "#bd0c0cd2",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.15)",
  },

  rowNoBorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowIcon: {
    marginRight: 10,
  },

  rowLabel: {
    fontSize: 15,
    color: "#ffffff",
  },

  rowValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },

  badge: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },

  primaryButton: {
    backgroundColor: "rgb(11, 35, 146)",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
  },

  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },

  logoutButton: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginHorizontal: 18,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    marginBottom: 10,
  },

  logoutButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },
});