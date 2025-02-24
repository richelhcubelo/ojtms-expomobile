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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Config from "@/config";

export default function WelcomeLoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    setIsLogin(true);
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
          <TouchableOpacity style={styles.Screen} onPress={handleGetStarted}>
            <View style={styles.welcomeContainer}>
              <Image
                source={require("@/assets/images/upperlogin.png")}
                style={styles.backgroundImage}
              />
              <Image
                source={require("@/assets/images/ojt-logowhite.png")}
                style={styles.ojtLogo}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
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
              <Icon
                name="lock"
                size={20}
                color="#888"
                style={styles.loginicon}
              />
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>Integrated On-the-Job Training</Text>
            <Text style={styles.footer1}>Monitoring System</Text>
          </View>
        </>
      ) : (
        <TouchableOpacity
          style={styles.fullScreenButton}
          onPress={handleGetStarted}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={require("@/assets/images/front-icon.png")}
              style={styles.logoWelcome}
            />
            <Image
              source={require("@/assets/images/welcomeimage.png")}
              style={styles.fullScreenImage}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f8f7",
  },
  backgroundImage: {
    position: "absolute",
    top: -10,
    width: "100%",
    height: 250, // Adjust height as needed
    resizeMode: "cover",
    borderRadius: 20,
  },
  loginContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    bottom: "20%",
    minHeight: 400,
    marginTop: 120, // Adjust margin to position the container below the image
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#0b6477",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
    left: 5,
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
    width: "100%",
    backgroundColor: "#0b6477",
    top: "1%",
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 20,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    fontSize: 12,
    color: "#9e9e9e",
    top: "5%",
    textAlign: "center",
  },
  footer1: {
    fontSize: 12,
    color: "#9e9e9e",
    textAlign: "center",
    top: "5%",
  },
  backButton: {
    position: "absolute",
    top: 15, // Adjust this value to position the button correctly
    left: 20, // Adjust this value to position the button correctly
    padding: 10,
    zIndex: 1, // Ensure the button is above other elements
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  fullScreenButton: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  Screen: {
    flex: 1,
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  logoWelcome: {
    width: 125, // Adjust size as needed
    height: 230,
    position: "absolute",
    top: "36%", // Adjust position as needed
    zIndex: 1,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  ojtLogo: {
    width: 420, // Adjust size as needed
    height: 100,
    position: "absolute",
    top: "30%", // Adjust positioning to ensure it appears above welcomeimage
    zIndex: 2,
  },
});
