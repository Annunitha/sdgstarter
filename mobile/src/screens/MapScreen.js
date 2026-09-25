import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MapScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.map}>
        <View style={[styles.pin, { left: "25%", top: "25%" }]} />
        <View style={[styles.pin, { left: "65%", top: "35%" }]} />
        <View style={[styles.pin, { left: "45%", top: "65%" }]} />
        <View style={styles.center}>
          <Text style={styles.title}>MAP PLACEHOLDER</Text>
          <Text style={styles.sub}>Restaurants / water sources / facilities / climate points</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#dfe5d9", padding: 16 },
  map: { flex: 1, borderRadius: 15, overflow: "hidden", justifyContent: "center", alignItems: "center" },
  center: { backgroundColor: "rgba(255,255,255,.8)", padding: 18, borderRadius: 12, alignItems: "center" },
  title: { fontWeight: "800", color: "#4b5563" },
  sub: { color: "#6b7280", marginTop: 5, textAlign: "center" },
  pin: { position: "absolute", width: 18, height: 18, borderRadius: 9, backgroundColor: "#263b68" }
});
