import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ChangePassword from "@/components/STUDENT/MODAL/ChangePassword";
import PersonalInfo from "@/components/STUDENT/PersonalInfo";
import CompanyInfo from "@/components/STUDENT/CompanyInfo";
import LogoutConfirmationModal from "@/components/STUDENT/MODAL/LogoutConfirmationModal";

export default function ProfileScreen() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control logout modal visibility

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Perform logout logic here, e.g., clear user data, navigate to login screen
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  if (showChangePassword) {
    return <ChangePassword onCancel={handleToggleChangePassword} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.year}>2022-2023</Text>
        </View>
        <Image
          source={require("@/assets/images/profilesample.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Richel H. Cubelo</Text>
        <Text style={styles.id}>186744</Text>

        <View style={styles.divider} />
        <PersonalInfo />
        <View style={styles.divider} />

        <CompanyInfo />

        <TouchableOpacity
          style={styles.button}
          onPress={handleToggleChangePassword}
        >
          <Icon name="lock" size={16} color="#787070" style={styles.icon} />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="sign-out" size={16} color="red" style={styles.icon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Logout confirmation modal */}
      {showLogoutModal && <LogoutConfirmationModal onCancel={cancelLogout} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  year: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  id: {
    fontSize: 16,
    color: "#0066cc",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#D3D3D3",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 7,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#787070",
    fontWeight: "normal",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});
