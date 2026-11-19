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

  /* MODAL DE EDICIÓN */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    backgroundColor: "#16205b",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    elevation: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },

  inputLabel: {
    fontSize: 14,
    color: "#d0d8ff",
    marginBottom: 6,
    marginTop: 10,
  },

  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#ffffff",
    fontSize: 15,
  },

  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },

  modalCancelButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  modalCancelButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },

  modalSaveButton: {
    flex: 1,
    backgroundColor: "#bd0c0cd2",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  modalSaveButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },

  suggestionsContainer: {
    maxHeight: 140,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    marginTop: 6,
  },

  suggestionItem: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },

  suggestionItemActive: {
    backgroundColor: "rgba(11, 35, 146, 0.45)",
  },

  suggestionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  suggestionSub: {
    color: "#d0d8ff",
    fontSize: 12,
  },

  /* JUGADORES FAVORITOS */
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 18,
  },
  emptyText: {
    color: "#ffffff",
    fontSize: 14,
    opacity: 0.85,
    textAlign: "center",
    marginBottom: 12,
  },
  emptyButton: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },
  favPlayerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.15)",
  },
  favPlayerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  favPlayerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgb(11, 35, 146)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  favPlayerDetails: {
    flex: 1,
  },
  favPlayerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },
  favPlayerSub: {
    fontSize: 12,
    color: "#d0d8ff",
    marginTop: 2,
  },
  deleteFavButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});