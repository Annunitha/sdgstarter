import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { api } from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      await AsyncStorage.setItem("sdg_token", data.token);
      await AsyncStorage.setItem("sdg_role", data.user.role);
      await AsyncStorage.setItem("sdg_user", JSON.stringify(data.user));

      navigation.replace("UserDashboard");
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>SDG STARTER</Text>
      <Text style={styles.title}>User Login</Text>
      <Text style={styles.muted}>Lorem ipsum dolor sit amet.</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Login" onPress={login} />
      <Button title="Create Account" secondary onPress={() => navigation.navigate("Register")} />
      <Button title="Admin Portal" secondary onPress={() => navigation.navigate("AdminLogin")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb", padding: 24, justifyContent: "center" },
  brand: { textAlign: "center", fontWeight: "800", letterSpacing: 1, color: "#18212f", marginBottom: 30 },
  title: { fontSize: 28, fontWeight: "800", color: "#18212f" },
  muted: { color: "#6b7280", marginBottom: 25 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#d7dbe2", borderRadius: 10, padding: 13, marginBottom: 12 }
});
