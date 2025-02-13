import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "@/config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type TimesheetEntry = {
  date: string;
  morning: { in: string; out: string };
  afternoon: { in: string; out: string };
  totalHours: number;
};

// Define the type for the navigation stack
type RootStackParamList = {
  SearchScreen: { timesheet: TimesheetEntry[] };
};

// Use the correct navigation type
type DTRTableNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchScreen"
>;

const DTRTable = () => {
  const [timesheet, setTimesheet] = useState<TimesheetEntry[]>([
    {
      date: "2023-10-01",
      morning: { in: "08:00 AM", out: "12:00 PM" },
      afternoon: { in: "01:00 PM", out: "05:00 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-02",
      morning: { in: "08:15 AM", out: "12:15 PM" },
      afternoon: { in: "01:15 PM", out: "05:15 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-03",
      morning: { in: "08:30 AM", out: "12:30 PM" },
      afternoon: { in: "01:30 PM", out: "05:30 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-04",
      morning: { in: "08:45 AM", out: "12:45 PM" },
      afternoon: { in: "01:45 PM", out: "05:45 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-05",
      morning: { in: "09:00 AM", out: "01:00 PM" },
      afternoon: { in: "02:00 PM", out: "06:00 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-05",
      morning: { in: "09:00 AM", out: "01:00 PM" },
      afternoon: { in: "02:00 PM", out: "06:00 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-05",
      morning: { in: "09:00 AM", out: "01:00 PM" },
      afternoon: { in: "02:00 PM", out: "06:00 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-05",
      morning: { in: "09:00 AM", out: "01:00 PM" },
      afternoon: { in: "02:00 PM", out: "06:00 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-05",
      morning: { in: "09:00 AM", out: "01:00 PM" },
      afternoon: { in: "02:00 PM", out: "06:00 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-05",
      morning: { in: "09:00 AM", out: "01:00 PM" },
      afternoon: { in: "02:00 PM", out: "06:00 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-05",
      morning: { in: "09:00 AM", out: "01:00 PM" },
      afternoon: { in: "02:00 PM", out: "06:00 PM" },
      totalHours: 8,
    },
    {
      date: "2023-10-05",
      morning: { in: "09:00 AM", out: "01:00 PM" },
      afternoon: { in: "02:00 PM", out: "06:00 PM" },
      totalHours: 8,
    },
  ]);
  const navigation = useNavigation<DTRTableNavigationProp>();
  // Fetch timesheet on component mount (optional, for real data)
  useEffect(() => {
    //
  }, []);

  const handleSearchPress = () => {
    console.log("Navigating to SearchScreen with timesheet:", timesheet); // Debug log
    navigation.navigate("SearchScreen", { timesheet });
  };
  return (
    <View style={styles.container}>
      {/* "Records" Heading */}
      <Text style={styles.heading}>Records</Text>

      {/* Fixed Table Header */}
      <View style={styles.tableHeader}>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Day</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Date</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Morning</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Afternoon</Text>
        </View>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Hours</Text>
        </View>
      </View>

      {/* Scrollable Table Body */}
      <ScrollView style={styles.scrollContainer}>
        {timesheet.map((row, index) => (
          <View key={index} style={styles.rowContainer}>
            <View style={styles.tableRow}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{row.date}</Text>
              </View>
              <View style={styles.cell}>
                <View style={styles.timeCell}>
                  <Text style={styles.timeText}>
                    In: <Text style={styles.inTime}>{row.morning.in}</Text>
                  </Text>
                  <Text style={styles.timeText}>
                    Out: <Text style={styles.outTime}>{row.morning.out}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.cell}>
                <View style={styles.timeCell}>
                  <Text style={styles.timeText}>
                    In: <Text style={styles.inTime}>{row.afternoon.in}</Text>
                  </Text>
                  <Text style={styles.timeText}>
                    Out: <Text style={styles.outTime}>{row.afternoon.out}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{row.totalHours} hrs</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Matching theme color
    textAlign: "left",
    marginBottom: 10, // Add space below the heading
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0b9ca7",
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 5,
  },
  headerCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 11,
    color: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  rowContainer: {
    marginBottom: 8, // Gap between rows
    borderWidth: 1, // Border for the row container
    borderColor: "#ddd",
    borderRadius: 5, // Rounded corners for the row container
    backgroundColor: "#fff", // Background color for the row container
    padding: 5, // Padding inside the row container
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  cellText: {
    textAlign: "center",
    fontSize: 10,
  },
  timeCell: {
    alignItems: "flex-start",
  },
  timeText: {
    fontSize: 8,
    textAlign: "left",
  },
  inTime: {
    color: "#0b9ca7",
    fontWeight: "bold",
  },
  outTime: {
    color: "red",
    fontWeight: "bold",
  },
});

export default DTRTable;
