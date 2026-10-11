import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

//Page to logout
//available from a tab icon
//will redirect auto to login page once logged out
export default function LogoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoutError, setLogoutError] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const { logout } = useAuth();

  async function handleSubmit() {
    setLogoutError(false);
    setLogoutMessage("");

    try {
      await logout();
      setLogoutMessage("Logout success");
      // router.replace("/logIn/logIn"); //don't keep history, just replace
    } catch (error) {
      console.log(error);
      setLogoutError(true);

      setLogoutMessage("Unable to log out");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <View
        style={{
          gap: 16,
          padding: 20,
          margin: 10,
        }}
      ></View>
      <Pressable
        onPress={handleSubmit}
        disabled={isSubmitting}
        style={{
          backgroundColor: "#397F76",
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 10,
          alignItems: "center",
          opacity: isSubmitting ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Log Out
            </Text>
          )}
        </Text>
      </Pressable>
      <Text
        style={{
          color: logoutError ? "red" : "black",
        }}
      >
        {logoutMessage}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
