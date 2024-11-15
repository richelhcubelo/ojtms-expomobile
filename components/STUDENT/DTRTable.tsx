import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DTRTable = () => {
  const data = [
    {
      date: "11-05-2024",
      day: "1",
      morning: { in: "7:30 AM", out: "12:16 PM" },
      afternoon: { in: "-", out: "-" },
      hours: "4 hrs",
    },
    {
      date: "11-06-2024",
      day: "2",
      morning: { in: "7:30 AM", out: "12:11 PM" },
      afternoon: { in: "12:30 AM", out: "5:12 PM" },
      hours: "8 hrs",
    },
    {
      date: "11-07-2024",
      day: "3",
      morning: { in: "7:36 AM", out: "12:19 PM" },
      afternoon: { in: "12:30 AM", out: "5:12 PM" },
      hours: "8 hrs",
    },
  ];

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Day</Text>
        <Text style={styles.headerText}>Morning</Text>
        <Text style={styles.headerText}>Afternoon</Text>
        <Text style={styles.headerText}>Hours</Text>
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cellText}>{row.date}</Text>
          <Text style={styles.cellText}>{row.day}</Text>
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
          <Text style={styles.cellText}>{row.hours}</Text>
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
