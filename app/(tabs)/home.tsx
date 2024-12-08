import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import TimeSchedule from "@/components/STUDENT/TimeSchedule";
import CalendarComponent from "@/components/STUDENT/CalendarComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnnouncementModal from "@/components/STUDENT/MODAL/AnnouncementModal";
import { Alert } from "react-native";
import Config from "@/config";
export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [announcement, setAnnouncement] = useState({
    type: "",
    content: "",
  });
  const [studentDetails, setStudentDetails] = useState({
    firstName: "N/A",
    renderedTime: 0,
    remainingTime: 0,
    requiredTime: 0,
    studentSex: "N/A",
  });

  const fetchStudentDetails = async () => {
    try {
      const studentId = await AsyncStorage.getItem("student_id");
      if (!studentId) {
        console.error("Student ID not found in AsyncStorage");
        return;
      }

      const response = await fetch(
        `${Config.API_BASE_URL}/api/student-homedetails?student_id=${studentId}`
      );
      const data = await response.json();

      if (response.ok) {
        setStudentDetails({
          firstName: data.studentDetails.firstName || "N/A",
          renderedTime: data.studentDetails.renderedTime || 0,
          remainingTime: data.studentDetails.remainingTime || 0,
          requiredTime: data.studentDetails.requiredTime || 0, // Map correctly
          studentSex: data.studentDetails.studentSex || "N/A",
        });
      } else {
        console.error("Error fetching student details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const calculateRenderedTime = async () => {
    try {
      const studentId = await AsyncStorage.getItem("student_id");
      if (!studentId) {
        Alert.alert("Error", "Student ID not found in AsyncStorage.");
        return;
      }

      // Fetch timesheet entries
      const response = await fetch(
        `${Config.API_BASE_URL}/api/student-timesheet?student_id=${studentId}`
      );
      const data = await response.json();

      if (response.ok) {
        // Parse `totalHours` as a float before summing
        interface TimesheetEntry {
          totalHours: string;
        }
        const totalRendered = data.timesheet.reduce(
          (sum: number, entry: TimesheetEntry) => {
            const hours = parseFloat(entry.totalHours); // Ensure it's a number
            return sum + (isNaN(hours) ? 0 : hours); // Safeguard against NaN
          },
          0
        );

        setStudentDetails((prev) => ({
          ...prev,
          renderedTime: parseFloat(totalRendered.toFixed(2)), // Ensure it's a number
          remainingTime: parseFloat(
            Math.max(prev.requiredTime - totalRendered, 0).toFixed(2) // Ensure non-negative and numeric
          ),
        }));
      } else {
        console.error("Error fetching timesheet:", data.error);
      }
    } catch (error) {
      console.error("Error fetching timesheet:", error);
    }
  };
  const showModal = (message: string) => {
    modalMessage;
    setModalMessage(message);
    setModalVisible(true);
  };
  const fetchLatestAnnouncement = async () => {
    try {
      const studentId = await AsyncStorage.getItem("student_id");
      if (!studentId) {
        console.error("Student ID not found in AsyncStorage");
        return;
      }

      const response = await fetch(
        `${Config.API_BASE_URL}/api/latest-announcement?student_id=${studentId}`
      );
      const data = await response.json();

      if (response.ok) {
        setAnnouncement({
          type: data.announcement.announcement_type,
          content: data.announcement.announcement_content,
        });
      } else {
        console.error("Error fetching announcement:", data.error);
      }
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  const showAnnouncementModal = () => {
    setModalVisible(true);
  };

  const getProfileImage = () => {
    if (studentDetails.studentSex === "Male") {
      return require("@/assets/images/male.png");
    } else if (studentDetails.studentSex === "Female") {
      return require("@/assets/images/female.png");
    }
    return require("@/assets/images/profilesample.png");
  };

  useEffect(() => {
    fetchLatestAnnouncement();
    fetchStudentDetails();
    calculateRenderedTime();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {/* OJTMS Header with Notification Button */}
      <View style={styles.headerContainer}>
        <View style={styles.ojtmsContainer}>
          <Text style={styles.ojtmsText}>
            <Text style={styles.ojText}>OJ</Text>
            <Text style={styles.tText}>T</Text>
            <Text style={styles.msText}>MS</Text>
          </Text>
        </View>

        {/* Notification Button */}
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => showModal("Hello! This is a modal message.")}
        >
          <Icon name="bell" size={24} color="#545454" />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Image source={getProfileImage()} style={styles.logo} />
        <Text style={styles.greetingText}>
          Hello there, {studentDetails.firstName}! 👋
        </Text>
      </View>

      {/* Rendered Time Information */}
      <View style={styles.timeContainer}>
        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>Rendered Time</Text>
          <Text style={styles.timeNumber}>
            {studentDetails.renderedTime} hrs
          </Text>
        </View>
        <View style={styles.remainingTimeBox}>
          <Text style={styles.remainingTimeLabel}>Remaining Time</Text>
          <Text style={styles.timeNumberSmall}>
            {studentDetails.remainingTime} hrs
          </Text>
        </View>
        <View style={styles.requiredDurationBox}>
          <Text style={styles.requiredDurationLabel}>Required Duration</Text>
          <Text style={styles.timeNumberSmall}>
            {" "}
            {studentDetails.requiredTime}
          </Text>
        </View>
      </View>

      <CalendarComponent />
      {/* Time Schedule Component */}
      <TimeSchedule />
      <AnnouncementModal
        isVisible={modalVisible}
        message={`**${announcement.type}**: ${announcement.content}`}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 2, // Space between OJTMS and header
  },
  ojtmsContainer: {
    alignSelf: "flex-start", // Align to the left
  },
  notificationButton: {
    padding: 8, // Padding for touch area around the icon
  },
  ojtmsText: {
    fontSize: 24, // Adjust size as needed
    fontWeight: "bold",
    textShadowColor: "#645757", // Shadow color
    textShadowOffset: { width: 1, height: 2 }, // Shadow offset (x, y)
    textShadowRadius: 2, // Shadow blur radius
  },
  ojText: {
    color: "#007487",
  },
  tText: {
    color: "#007487",
  },
  msText: {
    color: "#007487",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
    marginTop: 10, // Adjusted space above the header if needed
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeBox: {
    backgroundColor: "#0A77E4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "32%",
  },
  remainingTimeBox: {
    backgroundColor: "#E14B62",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "32%",
  },
  requiredDurationBox: {
    backgroundColor: "#FC8210",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "32%",
  },
  timeNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  timeNumberSmall: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  timeLabel: {
    fontSize: 12,
    color: "#fff",
  },
  remainingTimeLabel: {
    fontSize: 12,
    color: "#fff",
  },
  requiredDurationLabel: {
    fontSize: 12,
    color: "#fff",
  },
});
