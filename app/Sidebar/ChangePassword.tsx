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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons"; // Import EvilIcons

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    // Handle "Get Started" logic
  };

  const handleBack = () => {
    router.push("/home"); // Navigate back to the home screen
  };

  return (
    <View style={styles.container}>
      {/* Updated Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <EvilIcons
          name="chevron-left"
          size={30}
          color="#fff"
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.Screen} onPress={handleGetStarted}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require("@/assets/images/upperlogin.png")}
            style={styles.backgroundImage}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.changepassContainer}>
        <Text style={styles.title}>Reset Password</Text>
        {/* Subtitle */}
        <Text style={styles.subtitle}>You can type your new password and</Text>
        <Text style={styles.subtitle}>confirm it below</Text>

        {/* Current Password Field */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Current Password"
            placeholderTextColor="#c0c0c0" // Add placeholder color
            secureTextEntry={!showCurrentPassword} // Toggle visibility
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Icon
              name={showCurrentPassword ? "eye" : "eye-off"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* New Password Field */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="New Password"
            placeholderTextColor="#c0c0c0" // Add placeholder color
            secureTextEntry={!showNewPassword} // Toggle visibility
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Icon
              name={showNewPassword ? "eye" : "eye-off"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#c0c0c0" // Add placeholder color
            secureTextEntry={!showConfirmPassword} // Toggle visibility
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              name={showConfirmPassword ? "eye" : "eye-off"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Change Password Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
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
  changepassContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    bottom: "17%",
    minHeight: 430,
    marginTop: 120, // Adjust margin to position the container below the image
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
  },
  passwordContainer: {
    top: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 22,
    backgroundColor: "#fff",
    paddingLeft: 10, // Reduced padding
    paddingRight: 10,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    padding: 10, // Reduced padding
    paddingLeft: 0, // Align text to the left without space
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#0b6477",
  },
  subtitle: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    marginBottom: 1, // Add margin to separate from the fields
    bottom: 6,
  },
  Screen: {
    flex: 1,
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
    bottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 15, // Adjust this value to position the button correctly
    left: 10, // Adjust this value to position the button correctly
    padding: 10,
    zIndex: 1, // Ensure the button is above other elements
  },
  backIcon: {},
});
