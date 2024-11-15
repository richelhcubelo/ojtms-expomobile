import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import Icon component

export default function WelcomeLoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleGetStarted = () => {
    setIsLogin(true);
  };
  const router = useRouter();
  const handleLogin = () => {
    console.log("Login attempt with:", username, password);
    router.push("/home");
  };

  const handleBack = () => {
    setIsLogin(false);
    setUsername("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        <>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Image
            source={require("@/assets/images/logo-sidebar.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Student Login</Text>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="account"
              size={20}
              color="#888"
              style={styles.loginicon}
            />
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <Icon name="lock" size={20} color="#888" style={styles.loginicon} />
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword} // Toggle visibility
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>Integrated On-the-Job Training</Text>
          <Text style={styles.footer1}>Monitoring System</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Welcome, Trainee!</Text>
          <Text style={styles.subtitle}>
            Enjoy our free features that make attendance tracking effortless
            with QR code scanning for quick time in and time out.
          </Text>
          <Image
            source={require("@/assets/gifs/SCAN-QR.gif")}
            style={styles.gif}
          />
          <TouchableOpacity
            style={styles.welcomebutton}
            onPress={handleGetStarted}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#f9f8f7",
  },
  logo: {
    marginBottom: 80,
    justifyContent: "center",
    width: "90%",
    height: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: -60,
    textAlign: "center",
    color: "#007487",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#7d7d7d",
  },
  label: {
    alignSelf: "flex-start", // Align to the start (left) of the container
    marginBottom: 5,
    fontSize: 16,
    color: "#333", // Change the color to your preference
    left: 5,
  },
  gif: {
    width: 400,
    height: 400,
    marginBottom: -50,
    marginTop: -70,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingLeft: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  loginicon: {
    marginRight: -5,
  },
  input: {
    padding: 15,
  },
  button: {
    width: "75%",
    backgroundColor: "#1e8678",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 20,
  },
  welcomebutton: {
    width: "90%",
    backgroundColor: "#1e8678",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    fontSize: 12,
    color: "#9e9e9e",
    marginTop: 110,
    textAlign: "center",
  },
  footer1: {
    fontSize: 12,
    color: "#9e9e9e",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 2,
    left: 2,
    padding: 10,
  },
  backButtonText: {
    fontSize: 40,
    color: "#000",
  },
});
