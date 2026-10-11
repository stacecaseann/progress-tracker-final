import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

//sets navigation based on if logged in
export default function RootNavigation() {
  const { currentUser, authLoading } = useAuth();
  if (authLoading) {
    return <ActivityIndicator />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!currentUser}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!currentUser}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}
