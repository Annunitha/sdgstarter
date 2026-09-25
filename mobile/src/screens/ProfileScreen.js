import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("sdg_user").then(value => {
      if (value) setUser(JSON.parse(value));
    });
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.eyebrow}>PROFILE</Text>
      <Text style={styles.title}>Account Details</Text>

      {user && (
        <View style={styles.card}>
          <Row label="Name" value={user.name} />
          <Row label="Email" value={user.email} />
          <Row label="Role" value={user.role} />
          <Row label="Status" value={user.status} />
        </View>
      )}
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f5f7fb", padding: 20 },
  eyebrow: { color: "#263b68", fontWeight: "800", letterSpacing: 1.2, fontSize: 12 },
  title: { fontSize: 30, fontWeight: "800", marginBottom: 20 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 18, borderWidth: 1, borderColor: "#e5e7eb" },
  row: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  label: { color: "#6b7280", fontSize: 12 },
  value: { color: "#18212f", fontWeight: "700", marginTop: 3 }
});
