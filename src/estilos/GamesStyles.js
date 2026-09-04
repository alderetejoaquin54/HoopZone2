import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b41616d2",
  },

  header: {
    backgroundColor: "rgb(11, 35, 146",
    padding: 20,
    paddingTop: 50,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 5,
  },

  dateContainer: { 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#a10505d2",
    padding: 15,
  },

  dateButton: {
    backgroundColor: "rgb(9, 28, 114)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  dateButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
  },

  currentDate: {
    alignItems: "center",
  },

  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(9, 28, 114)",
  },

  dateNumber: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 3,
  },

  gamesContainer: {
    padding: 15,
  },

  gameCard: {
    backgroundColor: "rgb(9, 28, 114)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  gameHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  status: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },

  time: {
    color: "#ffffff",
    fontSize: 12,
  },

  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  team: {
    flex: 1,
    alignItems: "center",
  },

  teamName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },

  score: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 5,
  },

  vs: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    marginHorizontal: 10,
  },
});

export default styles;