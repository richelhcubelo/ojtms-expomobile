import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FileTable from "@/components/STUDENT/FileTable";
import AddReportModal from "@/components/STUDENT/AddReportModal";

export default function UploadScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reports, setReports] = useState<
    { date: string; remarks: string; fileName: string | null }[] // Allow null for fileName
  >([]);

  const handleAddReport = (remarks: string, fileName: string | null) => {
    // Allow null for fileName
    const currentDate = new Date().toLocaleDateString();
    const newReport = { date: currentDate, remarks, fileName }; // Include fileName in the report
    setReports((prevReports) => [...prevReports, newReport]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+ Add Report</Text>
      </TouchableOpacity>

      <FileTable data={reports} />

      <AddReportModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddReport={handleAddReport}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
  button: {
    backgroundColor: "#0A77E4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
