import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import LocationCard from "../components/LocationCard";
import { api } from "../services/api";

export default function UserDashboard({ navigation }) {
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const stored = JSON.parse(await AsyncStorage.getItem("sdg_user"));
        setUser(stored);

        const token = await AsyncStorage.getItem("sdg_token");
        const data = await api("/locations", { token });
        setLocations(data.locations);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
    load();
  }, []);

  async function logout() {
    await AsyncStorage.multiRemove(["sdg_token", "sdg_role", "sdg_user"]);
    navigation.replace("Login");
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>USER DASHBOARD</Text>
      <Text style={styles.title}>Welcome{user ? `, ${user.name}` : ""}</Text>

      <View style={styles.stats}>
        {[
          ["Resources", "24"],
          ["Locations", "18"],
          ["Alerts", "05"],
          ["Reports", "09"]
        ].map(([label, value]) => (
          <View style={styles.stat} key={label}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.section}>Location Map</Text>
      <View style={styles.map}>
        <Text style={styles.mapText}>MAP PLACEHOLDER</Text>
        <Text style={styles.mapSub}>Connect a real map when required.</Text>
      </View>

      <Button title="Open Map" onPress={() => navigation.navigate("Map")} />
      <Button title="Profile" secondary onPress={() => navigation.navigate("Profile")} />

      <Text style={styles.section}>Locations</Text>
      {locations.slice(0, 5).map(item => <LocationCard key={item.id} item={item} />)}

      <Button title="Logout" secondary onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f5f7fb" },
  content: { padding: 20 },
  eyebrow: { color: "#263b68", fontWeight: "800", letterSpacing: 1.2, fontSize: 12 },
  title: { fontSize: 30, fontWeight: "800", color: "#18212f", marginBottom: 20 },
  stats: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 22 },
  stat: { width: "47%", backgroundColor: "#fff", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#e5e7eb" },
  statLabel: { color: "#6b7280" },
  statValue: { fontSize: 26, fontWeight: "800", color: "#18212f", marginTop: 5 },
  section: { fontSize: 18, fontWeight: "800", color: "#18212f", marginVertical: 12 },
  map: { height: 230, borderRadius: 12, backgroundColor: "#dfe5d9", alignItems: "center", justifyContent: "center" },
  mapText: { fontWeight: "800", color: "#4b5563" },
  mapSub: { color: "#6b7280", marginTop: 5 }
});
