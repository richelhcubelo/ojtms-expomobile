import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CompanyInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Company Information</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Company Name:</Text>
        <Text style={styles.value}>Skyride</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>Tagbilaran City, Bohol</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Mentor Name:</Text>
        <Text style={styles.value}>John Doe</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Mentor Contact:</Text>
        <Text style={styles.value}>09898821411</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontWeight: "normal",
    width: 120,
    color: "#797474",
  },
  value: {
    color: "#000000",
  },
});
