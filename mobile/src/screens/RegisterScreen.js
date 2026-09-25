import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { api } from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });

      await AsyncStorage.setItem("sdg_token", data.token);
      await AsyncStorage.setItem("sdg_role", data.user.role);
      await AsyncStorage.setItem("sdg_user", JSON.stringify(data.user));

      navigation.replace("UserDashboard");
    } catch (error) {
      Alert.alert("Registration failed", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb", padding: 24, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 24, color: "#18212f" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#d7dbe2", borderRadius: 10, padding: 13, marginBottom: 12 }
});
