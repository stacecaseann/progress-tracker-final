import { useAuth } from "@/context/AuthContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

//Page to reset passord
export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [registerError, setRegisterError] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const { resetPassword } = useAuth();

  async function handleSubmit() {
    setRegisterError(false);
    setRegisterMessage("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setValidEmail(false);
    setIsSubmitting(true);
    try {
      await resetPassword(email);

      setRegisterMessage("Password email sent");
    } catch (error) {
      console.log(error);
      setRegisterError(true);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/missing-email":
            setRegisterMessage("No email was provided");
            break;
          case "auth/invalid-email":
            setRegisterMessage("Please enter a valid email address");
            break;
          case "auth/user-not-found":
            setRegisterMessage("No account found with this email");
            break;
          default:
            setRegisterMessage("Error resetting password");
        }
      }
      // catch(error is )
    } finally {
      setIsSubmitting(false);
    }
  }
  function changeEmail(value: string) {
    setValidEmail(true);
    setEmail(value);
  }
  function handleLogin(): void {
    router.replace("/login");
  }

  return (
    <>
      <View
        style={{
          gap: 12,
          padding: 36,

          flex: 1,
          //justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <View
          style={{
            gap: 22,
            padding: 36,

            // flex: 1,
            // justifyContent: "center",
            // alignItems: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 36,
              }}
            >
              Reset Password
            </Text>
          </View>
          <View style={{ height: 20 }} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={changeEmail}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.text}
          ></TextInput>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Ionicons
              name={"alert-circle-outline"}
              size={16}
              color={validEmail ? "green" : "red"}
              style={{ opacity: validEmail ? 0 : 1 }}
            ></Ionicons>
            <Text
              style={{
                color: "red",
                fontSize: 12,
              }}
            >
              {validEmail ? "" : "Email is invalid"}
            </Text>
          </View>

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
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                >
                  Reset
                </Text>
              )}
            </Text>
          </Pressable>
          <Text
            style={{
              color: registerError ? "red" : "black",
            }}
          >
            {registerMessage}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "gray" }}></View>
          <Text>OR</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "gray" }}></View>
        </View>
        <Pressable
          onPress={handleLogin}
          style={{
            borderColor: "#397F76",
            borderWidth: 2,
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 10,
            alignItems: "center",
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text
              style={{
                color: "#397F76",
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
