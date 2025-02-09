import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

interface FileTableProps {
  data: { date: string; remarks: string; fileName: string | null }[];
}

const FileTable: React.FC<FileTableProps> = ({ data }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Details</Text>

      {data.map((report, index) => (
        <View key={index} style={styles.reportContainer}>
          {report.fileName && report.fileName.startsWith("file://") ? (
            <Image
              source={{ uri: report.fileName }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text>No Image</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.dateText}>{report.date}</Text>
            <Text style={styles.remarksText}>{report.remarks}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Matching theme color
    textAlign: "left",
    marginBottom: 0,
    bottom: 15,
  },
  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  remarksText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default FileTable;
