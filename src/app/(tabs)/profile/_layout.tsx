import { Stack } from "expo-router";

//This is the default layout for the profile tab
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "View" }} />
      <Stack.Screen name="edit" options={{ title: "Edit" }} />
    </Stack>
  );
}
