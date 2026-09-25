import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { api } from "../services/api";

export default function AdminDashboard({ navigation }) {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    try {
      const token = await AsyncStorage.getItem("sdg_token");
      const data = await api("/admin/users", { token });
      setUsers(data.users);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  useEffect(() => { loadUsers(); }, []);

  async function toggle(user) {
    try {
      const token = await AsyncStorage.getItem("sdg_token");
      await api(`/admin/users/${user.id}/status`, {
        method: "PATCH",
        token,
        body: JSON.stringify({
          status: user.status === "active" ? "inactive" : "active"
        })
      });
      loadUsers();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  async function logout() {
    await AsyncStorage.multiRemove(["sdg_token", "sdg_role", "sdg_user"]);
    navigation.replace("Login");
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>ADMIN DASHBOARD</Text>
      <Text style={styles.title}>Control Center</Text>

      <View style={styles.stat}>
        <Text style={styles.label}>Total Users</Text>
        <Text style={styles.value}>{users.length}</Text>
      </View>

      <Button title="Map" onPress={() => navigation.navigate("Map")} />

      <Text style={styles.section}>Users</Text>

      {users.map(user => (
        <View style={styles.user} key={user.id}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.status}>{user.role} · {user.status}</Text>
          {user.role === "user" && (
            <Button
              title={user.status === "active" ? "Disable" : "Enable"}
              secondary
              onPress={() => toggle(user)}
            />
          )}
        </View>
      ))}

      <Button title="Logout" secondary onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f5f7fb" },
  content: { padding: 20 },
  eyebrow: { color: "#263b68", fontWeight: "800", letterSpacing: 1.2, fontSize: 12 },
  title: { fontSize: 30, fontWeight: "800", color: "#18212f", marginBottom: 20 },
  stat: { backgroundColor: "#fff", padding: 20, borderRadius: 12, borderWidth: 1, borderColor: "#e5e7eb" },
  label: { color: "#6b7280" },
  value: { fontSize: 30, fontWeight: "800", marginTop: 5 },
  section: { fontSize: 19, fontWeight: "800", marginVertical: 15 },
  user: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: "#e5e7eb" },
  name: { fontSize: 16, fontWeight: "800" },
  email: { color: "#6b7280", marginTop: 4 },
  status: { color: "#263b68", marginTop: 5, fontSize: 12 }
});
