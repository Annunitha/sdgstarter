import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress, secondary = false }) {
  return (
    <TouchableOpacity
      style={[styles.button, secondary && styles.secondary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#263b68",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 6
  },
  secondary: {
    backgroundColor: "#eef2f8"
  },
  text: {
    color: "#fff",
    fontWeight: "700"
  },
  secondaryText: {
    color: "#18212f"
  }
});
