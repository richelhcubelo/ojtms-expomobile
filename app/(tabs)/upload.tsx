import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FileTable from "@/components/STUDENT/FileTable";
import AddReportModal from "@/components/STUDENT/AddReportModal";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import FloatingAddButton from "@/components/FloatingAddButton"; // Import the FloatingAddButton

export default function UploadScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reports, setReports] = useState<
    { date: string; remarks: string; fileName: string | null }[]
  >([]);

  const navigation = useNavigation();

  const handleAddReport = (remarks: string, fileName: string | null) => {
    const currentDate = new Date().toLocaleDateString();
    const newReport = { date: currentDate, remarks, fileName };
    setReports((prevReports) => [...prevReports, newReport]);
    setModalVisible(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Upload Files"
        showBackButton={true}
        onBackPress={handleGoBack}
      />
      <ScrollView style={styles.scrollContainer}>
        {/* Main Content */}
        <View style={styles.contentContainer}>
          <FileTable data={reports} />

          <AddReportModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAddReport={handleAddReport}
          />
        </View>
      </ScrollView>

      {/* Floating Add Button - Placed outside ScrollView */}
      <FloatingAddButton onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
});
