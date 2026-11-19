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

  newsCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  newsCategory: {
    backgroundColor: "rgb(11, 35, 146)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  newsCategoryText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },

  newsDate: {
    color: "#d0d8ff",
    fontSize: 12,
  },

  newsTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
    lineHeight: 22,
  },

  newsSummary: {
    fontSize: 13,
    color: "#e8ecff",
    lineHeight: 19,
    marginBottom: 10,
  },

  newsFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
    paddingTop: 8,
  },

  newsAuthor: {
    fontSize: 12,
    color: "#ffd54f",
    fontWeight: "600",
  },
});
