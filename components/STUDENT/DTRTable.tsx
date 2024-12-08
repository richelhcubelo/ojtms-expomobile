import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "@/config";
const DTRTable = () => {
  const [timesheet, setTimesheet] = useState([]);
  // Fetch timesheet on component mount
  useEffect(() => {
    const fetchStudentTimesheet = async () => {
      try {
        const studentId = await AsyncStorage.getItem("student_id");
        if (!studentId) {
          console.error("Student ID not found in AsyncStorage");
          return;
        }

        const response = await fetch(
          `${Config.API_BASE_URL}/api/student-timesheet?student_id=${studentId}`
        );
        const data = await response.json();

        if (response.ok) {
          setTimesheet(data.timesheet);
        } else {
          console.error("Error fetching timesheet:", data.error);
        }
      } catch (error) {
        console.error("Error fetching timesheet:", error);
      }
    };

    fetchStudentTimesheet();
  }, []);

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Day</Text>
        <Text style={styles.headerText}>Morning</Text>
        <Text style={styles.headerText}>Afternoon</Text>
        <Text style={styles.headerText}>Hours</Text>
      </View>
      {timesheet.map((row, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cellText}>{row.date}</Text>
          <Text style={styles.cellText}>{index + 1}</Text>
          <View style={styles.timeCell}>
            <Text style={styles.timeText}>
              In: <Text style={styles.inTime}>{row.morning.in}</Text>
            </Text>
            <Text style={styles.timeText}>
              Out: <Text style={styles.outTime}>{row.morning.out}</Text>
            </Text>
          </View>
          <View style={styles.timeCell}>
            <Text style={styles.timeText}>
              In: <Text style={styles.inTime}>{row.afternoon.in}</Text>
            </Text>
            <Text style={styles.timeText}>
              Out: <Text style={styles.outTime}>{row.afternoon.out}</Text>
            </Text>
          </View>
          <Text style={styles.cellText}>{row.totalHours} hrs</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    margin: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  cellText: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
  },
  timeCell: {
    flex: 1,
    alignItems: "flex-start",
  },
  timeText: {
    fontSize: 8,
    textAlign: "left",
  },
  inTime: {
    color: "blue", // Apply blue color for time values (In)
    fontWeight: "bold", // Make the In time bold
  },
  outTime: {
    color: "red", // Apply red color for time values (Out)
    fontWeight: "bold", // Make the Out time bold
  },
});

export default DTRTable;
