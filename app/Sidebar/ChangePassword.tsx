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
      <TouchableOpacity style={styles.Screen} onPress={handleGetStarted}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require("@/assets/images/upperlogin.png")}
            style={styles.backgroundImage}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.title}>Change Password</Text>
      </View>
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
});
