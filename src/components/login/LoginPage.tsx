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

//Page to handle login
//links to register and reset password
//will default here if not signed in
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const { login, signInWithGoogle } = useAuth();

  async function handleSubmit() {
    setLoginError(false);
    setLoginMessage("");

    if (!email || !password) setValidEmail(false);
    setIsSubmitting(true);
    try {
      const userCredential = await login(email, password);
      console.log(userCredential);
      setLoginMessage("Login success");
      // router.replace("/(tabs)/index"); //don't keep history, just replace
    } catch (error) {
      console.log(error);
      setLoginError(true);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setLoginMessage("Invalid email or password");
            break;
          case "auth/invalid-email":
            setLoginMessage("Please enter a valid email address");
            break;
          case "auth/user-disabled":
            setLoginMessage("This account has been disabled");
            break;
          case "auth/too-many-requests":
            setLoginMessage("Too many attempts. Please try again later");
            break;
          case "auth/network-request-failed":
            setLoginMessage(
              "Unable to connect. Check your internet connection."
            );
            break;
          default:
            setLoginMessage("Unable to log in");
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
  function handleResetPassword(): void {
    console.log("Reset password");
    //router.replace("/reset");
  }

  function handleRegister(): void {
    router.replace("/login/register");
  }

  async function handleSignInWithGoogle() {
    console.log("Login with google");
    setIsSubmitting(true);
    try {
      const userCredential = await signInWithGoogle();
      console.log(userCredential);
      setLoginMessage("Login success");
      //router.replace("/"); //don't keep history, just replace
    } catch (error) {
      console.log(error);
      setLoginError(true);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/account-exists-with-different-credential":
            setLoginMessage(
              "This email is associated with another sign-in method."
            );
            break;
          case "auth/invalid-credential":
            setLoginMessage("Invalid email or password");
            break;
          case "auth/credential-already-in-use":
            setLoginMessage(
              "This Google account is already linked to another user."
            );
            break;
          case "auth/user-disabled":
            setLoginMessage("This account has been disabled");
            break;
          case "auth/too-many-requests":
            setLoginMessage("Too many attempts. Please try again later");
            break;
          case "auth/network-request-failed":
            setLoginMessage(
              "Unable to connect. Check your internet connection."
            );
            break;
          default:
            setLoginMessage("Unable to log in");
        }
      }
      // catch(error is )
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <View
        style={{
          gap: 40,
          padding: 36,

          // flex: 1,
          // justifyContent: "center",
          // alignItems: "flex-start",
        }}
      >
        <View
          style={{
            gap: 12,
            padding: 36,

            // flex: 1,
            // justifyContent: "center",
            // alignItems: "flex-start",
          }}
        >
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
              {validEmail ? "" : "Credentials are not invalid"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              textContentType="password"
              style={[styles.text, { flex: 2 }]}
            ></TextInput>
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={14}
              ></Ionicons>
            </Pressable>
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
                  Log In
                </Text>
              )}
            </Text>
          </Pressable>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable onPress={handleResetPassword}>
              <Text>Forgot password?</Text>
            </Pressable>
            <Pressable onPress={handleRegister}>
              <Text>Register</Text>
            </Pressable>
            <Text
              style={{
                color: loginError ? "red" : "black",
              }}
            >
              {loginMessage}
            </Text>
          </View>
        </View>
        {/* Skip google for now since it requires a dev build */}
        {/* <View
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
          onPress={handleSignInWithGoogle}
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
            <Ionicons
              name="logo-google"
              size={20}
              style={{
                color: "#397F76",
              }}
            ></Ionicons>
            <Text
              style={{
                color: "#397F76",
                fontWeight: "bold",
              }}
            >
              Sign in with Google
            </Text>
          </View>
        </Pressable> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
