import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LocationCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.description}>{item.description || "Lorem ipsum dolor sit amet."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  title: { fontSize: 16, fontWeight: "700", color: "#18212f" },
  category: { marginTop: 4, color: "#263b68", fontSize: 12, fontWeight: "700" },
  description: { marginTop: 8, color: "#6b7280" }
});
