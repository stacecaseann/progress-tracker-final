//This is the layout of the app.

import { Stack } from "expo-router";

//Stack for logout and login functionality
export default function LogInLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Log In",
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="bar-chart-outline" size={size} color={color} />
          // ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="bar-chart-outline" size={size} color={color} />
          // ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          title: "Reset Password",
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="bar-chart-outline" size={size} color={color} />
          // ),
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="logout"
        options={{
          title: "Log Out",
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="bar-chart-outline" size={size} color={color} />
          // ),
        }}
      ></Stack.Screen>
    </Stack>
  );
}
