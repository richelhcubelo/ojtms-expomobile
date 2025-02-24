import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import NoNotifHeader from "@/components/NoNotifHeader"; // Adjust the import path as needed
import { useNavigation, useLocalSearchParams } from "expo-router";

const Details: React.FC = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams(); // Get the parameters passed from the Profile screen

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <NoNotifHeader
        title="Student Details"
        showBackButton={true} // Pass true to show the back button
        onBackPress={handleGoBack} // Pass the function to handle back press
      />
      <ScrollView style={styles.content}>
        {/* Profile Image */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/profilesample.png")}
            style={styles.profileImage}
          />
        </View>

        {/* Full Name */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value="Richel Cubelo"
            editable={false}
          />
        </View>

        {/* School ID and Gender in one row */}
        <View style={styles.rowContainer}>
          <View style={[styles.detailItem, styles.flexHalf]}>
            <Text style={styles.label}>School ID</Text>
            <TextInput style={styles.input} value="123456" editable={false} />
          </View>
          <View style={[styles.detailItem, styles.flexHalf]}>
            <Text style={styles.label}>Gender</Text>
            <TextInput style={styles.input} value="Female" editable={false} />
          </View>
        </View>

        {/* Contact Number */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value="+123 456 7890"
            editable={false}
          />
        </View>

        {/* Address */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value="123 Main St, City, Country"
            editable={false}
          />
        </View>

        {/* Email */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value="cubelo@example.com"
            editable={false}
          />
        </View>

        {/* Program */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Program</Text>
          <TextInput
            style={styles.input}
            value="Bachelor of Science in Computer Science"
            editable={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center", // Center the image horizontally
    marginBottom: 20, // Add some space below the image
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make the image circular
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0b9ca7",
  },
  detailItem: {
    marginBottom: 18,
    top: 2,
  },
  label: {
    fontSize: 16,
    color: "#0b9ca7",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: "#666",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  rowContainer: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Add space between the two fields
  },
  flexHalf: {
    flex: 0.48, // Each field takes up 48% of the row's width
  },
});

export default Details;
