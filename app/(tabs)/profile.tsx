import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangePassword from "@/components/STUDENT/MODAL/ChangePassword";
import PersonalInfo from "@/components/STUDENT/PersonalInfo";
import CompanyInfo from "@/components/STUDENT/CompanyInfo";
import LogoutConfirmationModal from "@/components/STUDENT/MODAL/LogoutConfirmationModal";
import Config from "@/config";
export default function ProfileScreen() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState("");

  // Fetching student details should be at the top level as well
  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleToggleChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };

  const getProfileImage = () => {
    if (studentDetails.student_sex === "Male") {
      return require("@/assets/images/male.png");
    } else if (studentDetails.student_sex === "Female") {
      return require("@/assets/images/female.png");
    }
    return require("@/assets/images/profilesample.png");
  };

  // Ensure this function is defined but not conditionally called
  const fetchStudentDetails = async () => {
    try {
      const studentId = await AsyncStorage.getItem("student_id");
      if (!studentId) {
        console.error("Student ID not found in AsyncStorage");
        return;
      }

      const response = await fetch(
        `${Config.API_BASE_URL}/api/student-details?student_id=${studentId}`
      );
      const data = await response.json();

      if (response.ok) {
        setStudentDetails(data.studentDetails);
      } else {
        console.error("Error fetching student details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  // Conditional rendering should not affect hook calls
  if (showChangePassword) {
    return <ChangePassword onCancel={handleToggleChangePassword} />;
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.year}>{studentDetails.school_yr || "N/A"}</Text>
        </View>
        <Image source={getProfileImage()} style={styles.profileImage} />
        <Text style={styles.name}>{studentDetails.student_name || "N/A"}</Text>
        <Text style={styles.id}>
          {studentDetails.student_schoolid || "N/A"}
        </Text>

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
