import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import CalendarComponent from "@/components/STUDENT/CalendarComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnnouncementModal from "@/components/STUDENT/MODAL/AnnouncementModal";
import { Alert } from "react-native";
import Config from "@/config";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import NotificationIcon from "@/components/NotificationIcon";
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
    <ScrollView style={styles.containerr}>
      <View style={styles.headerBackground}>
        <View style={styles.headerr}>
          <Image source={getProfileImage()} style={styles.loggo} />
          <Text style={styles.greetingTextt}>
            Hello there,{"\n"}
            <Text style={styles.firstNameText}>
              {studentDetails.firstName}! 👋
            </Text>
          </Text>
          <View style={styles.notificationIconContainer}>
            <NotificationIcon />
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search..." />
        </View>
      </View>

      <View style={styles.overviewContainer}>
        <Text style={styles.overviewText}>Overview</Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>Rendered Time</Text>
            <Text style={styles.timeNumber}>
              {studentDetails.renderedTime} hrs
            </Text>
            <View style={[styles.colorBar, { backgroundColor: "#0b9ca7" }]} />
          </View>
          <View style={styles.remainingTimeBox}>
            <Text style={styles.timeLabel}>Remaining Time</Text>
            <Text style={styles.timeNumber}>
              {studentDetails.remainingTime} hrs
            </Text>
            <View style={[styles.colorBar, { backgroundColor: "#0b9ca7" }]} />
          </View>
          <View style={styles.requiredDurationBox}>
            <Text style={styles.timeLabel}>Required Duration</Text>
            <Text style={styles.timeNumber}>
              {studentDetails.requiredTime} hrs
            </Text>
            <View style={[styles.colorBar, { backgroundColor: "#0b9ca7" }]} />
          </View>
        </ScrollView>
      </View>

      {/* Today's Appointment Section */}
      <View style={styles.exploreContainer}>
        <Text style={styles.exploreText}>Explore</Text>
        {/* Add your appointment list here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerBackground: {
    backgroundColor: "#0b9ca7",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loggo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greetingTextt: {
    fontSize: 18,
    color: "#fff",
    flex: 1, // Allow the text to take up available space
    marginLeft: 10, // Add some spacing between the image and text
  },
  firstNameText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  notificationIconContainer: {
    bottom: 6.5,
    marginLeft: 10, // Adjust spacing to match the Header component
  },
  searchContainer: {
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: "center",
    marginBottom: 7,
  },
  searchInput: {
    fontSize: 16,
  },
  overviewContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 10,
    marginTop: 12,
    paddingHorizontal: 10,
  },
  overviewText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 5,
  },
  horizontalScroll: {
    flexDirection: "row",
    marginTop: 5,
  },
  timeBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 120,
    marginHorizontal: 5,
  },
  remainingTimeBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 120,
    marginHorizontal: 5,
  },
  requiredDurationBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 120,
    marginHorizontal: 5,
  },
  timeNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  timeLabel: {
    fontSize: 15,
    color: "#000",
  },
  colorBar: {
    height: 5,
    width: "100%",
    marginTop: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  exploreContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  exploreText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
  },
});
