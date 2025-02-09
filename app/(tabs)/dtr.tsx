import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import Header from "@/components/Header"; // Import the Header component
import DTRTable from "@/components/STUDENT/DTRTable";
import FloatingDownloadButton from "@/components/FloatingAddButton"; // Import the FloatingAddButton
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function DTRScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Get the navigation object

  // Function to handle back button press
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen (home screen)
  };

  return (
    <View style={styles.container}>
      <Header title="DTR" showBackButton={true} onBackPress={handleGoBack} />
      <ScrollView style={styles.container}>
        <Header title="DTR" showBackButton={true} onBackPress={handleGoBack} />

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
      </ScrollView>
      <FloatingDownloadButton onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container1: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20, // Add some space below the header
  },
  container2: {
    flex: 1,
    paddingHorizontal: 10, // Add horizontal padding for better spacing
  },
  button: {
    backgroundColor: "#0A77E4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: 5,
  },
  icon: {
    marginRight: 2,
  },
});
