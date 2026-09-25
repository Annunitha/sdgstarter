import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./src/screens/LoginScreen";
import AdminLoginScreen from "./src/screens/AdminLoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import UserDashboard from "./src/screens/UserDashboard";
import AdminDashboard from "./src/screens/AdminDashboard";
import MapScreen from "./src/screens/MapScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const token = await AsyncStorage.getItem("sdg_token");
      const role = await AsyncStorage.getItem("sdg_role");

      if (token && role === "admin") setInitialRoute("AdminDashboard");
      else if (token && role === "user") setInitialRoute("UserDashboard");
      else setInitialRoute("Login");
    }

    checkSession();
  }, []);

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#18212f"
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "User Login" }} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} options={{ title: "Admin Login" }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ title: "Dashboard" }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: "Admin Dashboard" }} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
