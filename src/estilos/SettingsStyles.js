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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.15)",
  },

  rowNoBorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  rowIcon: {
    marginRight: 12,
  },

  rowLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },

  rowSubLabel: {
    fontSize: 12,
    color: "#d0d8ff",
    marginTop: 2,
  },

  /* SELECTORES TIPO PILL */
  pillGroup: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 12,
    padding: 3,
    marginTop: 8,
  },

  pill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 9,
  },

  pillActive: {
    backgroundColor: "rgb(11, 35, 146)",
    elevation: 2,
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

  /* BOTÓN GUARDAR */
  saveButton: {
    backgroundColor: "rgb(11, 35, 146)",
    marginHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 4,
    marginBottom: 14,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  savedStatus: {
    color: "#98ff98",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
});
