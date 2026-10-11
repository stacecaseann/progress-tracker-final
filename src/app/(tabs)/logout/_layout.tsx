//This is the layout of the app.

import { Stack } from "expo-router";

//Just holds the page to perform logout functionality
export default function LogoutLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "" }} />
    </Stack>
  );
}
