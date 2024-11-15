import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

interface FileTableProps {
  data: { date: string; remarks: string; fileName: string | null }[];
}

const FileTable: React.FC<FileTableProps> = ({ data }) => {
  return (
    <View style={styles.tableContainer}>
      <ScrollView>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Date</Text>
          <Text style={styles.tableHeader}>Uploaded Files</Text>
          <Text style={styles.tableHeader}>Remarks</Text>
        </View>
        {data.map((report, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableData}>{report.date}</Text>
            <View style={styles.fileContainer}>
              {report.fileName && report.fileName.startsWith("file://") ? (
                <Image
                  source={{ uri: report.fileName }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.tableData}>{report.fileName || "-"}</Text>
              )}
            </View>
            <Text style={styles.tableData}>{report.remarks}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20,
    width: "100%",
    maxHeight: 500,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  tableData: {
    fontSize: 14,
    color: "#555",
    flex: 1,
    textAlign: "center",
  },
  fileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default FileTable;
