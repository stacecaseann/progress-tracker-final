import { useAuth } from "@/context/AuthContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function AppTabs() {
  const { currentUser, authLoading } = useAuth();
  if (authLoading) return <ActivityIndicator />;
  const isLoggedIn = !!currentUser;
  return (
    <Tabs>
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="bar-chart-outline" size={size} color={color} />
          // ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="reset"
        options={{
          title: "Reset Password",
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="bar-chart-outline" size={size} color={color} />
          // ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="login"
        options={{
          title: "Log In",
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="bar-chart-outline" size={size} color={color} />
          // ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="logout"
        options={{
          title: "Log Out",
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="bar-chart-outline" size={size} color={color} />
          // ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          href: !isLoggedIn ? null : undefined,
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
          href: !isLoggedIn ? null : undefined,
        }}
      />
      <Tabs.Screen
        name="checkIns"
        options={{
          title: "Check-In",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
          href: !isLoggedIn ? null : undefined,
        }}
      />
    </Tabs>
  );
}
