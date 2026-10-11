import { useAuth } from "@/context/AuthContext";
import Ionicons from "@react-native-vector-icons/ionicons";
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

//page to register user
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [registerError, setRegisterError] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const { register } = useAuth();

  async function handleSubmit() {
    setRegisterError(false);
    setRegisterMessage("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setValidEmail(false);
    setIsSubmitting(true);
    try {
      const userCredential = await register(email, password);
      console.log(userCredential);
      setRegisterMessage("Account created successfully");
    } catch (error) {
      console.log(error);
      setRegisterError(true);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setRegisterMessage("This email is already registered.");
            break;
          case "auth/invalid-email":
            setRegisterMessage("Please enter a valid email address");
            break;
          default:
            setRegisterMessage("Error creating account");
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
  return (
    <>
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
            {validEmail ? "" : "Email is invalid"}
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
            autoComplete="new-password"
            textContentType="newPassword"
            style={[styles.text, { flex: 2 }]}
          ></TextInput>
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={14}
            ></Ionicons>
          </Pressable>
        </View>
        <View>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Ionicons
              name={
                password.length < 8
                  ? "checkmark-circle-outline"
                  : "checkmark-circle"
              }
              size={24}
              color={password.length < 8 ? "red" : "green"}
            ></Ionicons>
            <Text
            // style={{
            //   color: password.length < 8 ? "red" : "black",
            // }}
            >
              Password must contain 8 characters
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Ionicons
              name={
                !/[A-Z]/.test(password)
                  ? "checkmark-circle-outline"
                  : "checkmark-circle"
              }
              size={24}
              color={!/[A-Z]/.test(password) ? "red" : "green"}
            ></Ionicons>
            <Text
            // style={{
            //   color: password.length < 8 ? "red" : "black",
            // }}
            >
              Password must contain an uppercase letter
            </Text>
          </View>
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
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                Register
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
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
