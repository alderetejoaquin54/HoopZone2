import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3F8",
  },

  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 25,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#17408B",
  },

  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#17408B",
    marginTop: 15,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#17408B",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    color: "#333",
  },

  activityText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },

  blueButton: {
    backgroundColor: "#17408B",
    marginHorizontal: 18,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 12,
  },

  redButton: {
    backgroundColor: "#C9082A",
    marginHorizontal: 18,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 35,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});