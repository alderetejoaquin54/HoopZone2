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

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },

  rowNoBorder: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  rowIcon: {
    marginRight: 14,
  },

  rowLabel: {
    fontSize: 15,
    color: "#ffffff",
    flex: 1,
  },

  badge: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
