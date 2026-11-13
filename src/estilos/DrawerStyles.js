import { StyleSheet } from "react-native";

export default StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "rgb(11, 35, 146)",
  },

  // HEADER DEL DRAWER
  drawerHeader: {
    backgroundColor: "#bd0c0cd2",
    paddingTop: 54,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.15)",
  },

  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgb(11, 35, 146)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#ffffff",
    marginBottom: 10,
    elevation: 4,
  },

  drawerUsername: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },

  drawerUserTag: {
    fontSize: 13,
    color: "#d0d8ff",
    marginTop: 2,
  },

  // SECCIONES Y ITEMS
  drawerSection: {
    paddingTop: 10,
    paddingBottom: 4,
    paddingHorizontal: 16,
  },

  drawerSectionLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#d0d8ff",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
    marginLeft: 4,
  },

  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginVertical: 2,
  },

  drawerItemActive: {
    backgroundColor: "#bd0c0cd2",
  },

  drawerItemIcon: {
    marginRight: 14,
  },

  drawerItemLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#d0d8ff",
  },

  drawerItemLabelActive: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  drawerDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    marginHorizontal: 16,
    marginVertical: 8,
  },

  // FOOTER DEL DRAWER
  drawerFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.12)",
  },

  drawerFooterText: {
    fontSize: 11,
    color: "#d0d8ff",
    textAlign: "center",
    opacity: 0.6,
  },
});
