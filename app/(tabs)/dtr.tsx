import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

import DTRTable from "@/components/STUDENT/DTRTable";

export default function DTRScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="download" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Download DTR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container2}>
        <DTRTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
  container1: {
    // Center the button horizontally and vertically
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Add some space below the button
  },
  container2: {
    flex: 1, // Fill the remaining screen space
  },
  button: {
    backgroundColor: "#0A77E4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "90%",
    flexDirection: "row", // Align the icon and text horizontally
    alignItems: "center", // Center the icon and text vertically
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: 5, // Add some space between the icon and text
  },
  icon: {
    marginRight: 2, // Add some space between the icon and text
  },
});
