import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import NoNotifHeader from "@/components/NoNotifHeader"; // Adjust the import path as needed
import { useNavigation } from "expo-router";

const CompanyDetails: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <NoNotifHeader
        title="Company Details"
        showBackButton={true} // Pass true to show the back button
        onBackPress={handleGoBack} // Pass the function to handle back press
      />
      <ScrollView style={styles.content}>
        {/* Company Name */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Company Name</Text>
          <TextInput style={styles.input} value="Skyride" editable={false} />
        </View>

        {/* Company Address */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Company Address</Text>
          <TextInput
            style={styles.input}
            value="Bentig, Calape, Bohol"
            editable={false}
          />
        </View>

        {/* Supervisor Name */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Supervisor Name</Text>
          <TextInput
            style={styles.input}
            value="Ryan Amasora"
            editable={false}
          />
        </View>

        {/* Supervisor Contact # */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Supervisor Contact #</Text>
          <TextInput
            style={styles.input}
            value="+123 456 7890"
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
});

export default CompanyDetails;
