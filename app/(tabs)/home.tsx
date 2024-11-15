import React from "react";
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

export default function HomeScreen() {
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
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="bell" size={24} color="#545454" />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/profilesample.png")}
          style={styles.logo}
        />
        <Text style={styles.greetingText}>Hello there, Richel! 👋</Text>
      </View>

      {/* Rendered Time Information */}
      <View style={styles.timeContainer}>
        <View style={styles.timeBox}>
          <Text style={styles.timeLabel}>Rendered Time</Text>
          <Text style={styles.timeNumber}>20 hrs</Text>
        </View>
        <View style={styles.remainingTimeBox}>
          <Text style={styles.remainingTimeLabel}>Remaining Time</Text>
          <Text style={styles.timeNumberSmall}>300 hrs</Text>
        </View>
        <View style={styles.requiredDurationBox}>
          <Text style={styles.requiredDurationLabel}>Required Duration</Text>
          <Text style={styles.timeNumberSmall}>320 hrs</Text>
        </View>
      </View>

      <CalendarComponent />
      {/* Time Schedule Component */}
      <TimeSchedule />
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
