import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PersonalInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>Female</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Contact Number:</Text>
        <Text style={styles.value}>09889787778</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>cubelorichel@gmail.com</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Program:</Text>
        <Text style={styles.value}>BSCS</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>Bentig, Calape, Bohol</Text>
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
