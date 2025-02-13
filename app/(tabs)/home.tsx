import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Config from "@/config";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import NotificationIcon from "@/components/NotificationIcon";
import { useRouter } from "expo-router";
import Profile from "../Sidebar/Profile";

type HomeScreenRouteProp = RouteProp<
  { home: { openProfile: () => void } },
  "home"
>;

export default function HomeScreen() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position off-screen
  const navigation = useNavigation();
  const route = useRoute();
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

  const openProfile = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide in to 0 (fully visible)
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeProfile = () => {
    Animated.timing(slideAnim, {
      toValue: -300, // Slide out to the left
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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
          requiredTime: data.studentDetails.requiredTime || 0,
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

      const response = await fetch(
        `${Config.API_BASE_URL}/api/student-timesheet?student_id=${studentId}`
      );
      const data = await response.json();

      if (response.ok) {
        interface TimesheetEntry {
          totalHours: string;
        }
        const totalRendered = data.timesheet.reduce(
          (sum: number, entry: TimesheetEntry) => {
            const hours = parseFloat(entry.totalHours);
            return sum + (isNaN(hours) ? 0 : hours);
          },
          0
        );

        setStudentDetails((prev) => ({
          ...prev,
          renderedTime: parseFloat(totalRendered.toFixed(2)),
          remainingTime: parseFloat(
            Math.max(prev.requiredTime - totalRendered, 0).toFixed(2)
          ),
        }));
      } else {
        console.error("Error fetching timesheet:", data.error);
      }
    } catch (error) {
      console.error("Error fetching timesheet:", error);
    }
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBackground}>
          <View style={styles.headerr}>
            <TouchableOpacity onPress={openProfile}>
              <Image source={getProfileImage()} style={styles.loggo} />
            </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => router.push("/SearchScreen")}
          >
            <Text style={styles.searchPlaceholder}>Search...</Text>
          </TouchableOpacity>
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

        <View style={styles.exploreContainer}>
          <Text style={styles.exploreText}>Explore</Text>
        </View>
      </ScrollView>

      {/* Profile Overlay */}
      <Animated.View
        style={[
          styles.profileOverlay,
          {
            transform: [{ translateX: slideAnim }],
            bottom: 0, // Adjust this to cover the tab bar
            zIndex: 100, // Ensure this is higher than the tab bar's zIndex
          },
        ]}
      >
        <Profile onClose={closeProfile} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
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
    flex: 1,
    marginLeft: 10,
  },
  firstNameText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  notificationIconContainer: {
    bottom: 6.5,
    marginLeft: 10,
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
  searchPlaceholder: {
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
  profileOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "75%",
    height: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
  },
});
