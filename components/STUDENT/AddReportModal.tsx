import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface AddReportModalProps {
  visible: boolean;
  onClose: () => void;
  onAddReport: (remarks: string, fileUri: string | null) => void; // Keep fileUri for submission
}

const AddReportModal: React.FC<AddReportModalProps> = ({
  visible,
  onClose,
  onAddReport,
}) => {
  const [remarks, setRemarks] = useState("");
  const [fileName, setFileName] = useState<string | null>(null); // Store the friendly file name
  const [selectedFile, setSelectedFile] = useState<string | null>(null); // Store the actual URI for submission

  const handleFileSelection = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Enable editing
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const asset = result.assets[0]; // Access the first asset
        const uri = asset.uri;

        // Extract the filename from the asset
        let extractedFileName = asset.fileName || uri.split("/").pop(); // Fallback to URI if fileName is not present
        if (extractedFileName) {
          setFileName(extractedFileName); // Set the friendly file name to state
        } else {
          setFileName("Unknown File"); // Fallback if no name could be determined
        }

        setSelectedFile(uri); // Store the actual URI for submission
      } else {
        console.log("User canceled the picker or no file selected.");
      }
    } catch (err) {
      console.error("Error picking file:", err);
    }
  };

  const handleSubmit = () => {
    onAddReport(remarks, selectedFile); // Submit the URI for actual upload
    setRemarks("");
    setFileName(null);
    setSelectedFile(null);
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Report</Text>
          <View style={styles.addFilesContainer}>
            <MaterialIcons name="cloud-upload" size={40} color="#0A77E4" />
            <TouchableOpacity onPress={handleFileSelection}>
              <Text style={styles.chooseFilesLink}>Choose Image</Text>
            </TouchableOpacity>
            {fileName ? ( // Display the friendly file name
              <Text style={styles.selectedFileName}>{fileName}</Text>
            ) : null}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter remarks..."
            value={remarks}
            onChangeText={setRemarks}
            multiline
            numberOfLines={4}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addFilesContainer: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  chooseFilesLink: {
    color: "#0A77E4",
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedFileName: {
    marginTop: 10,
    color: "#555",
    fontStyle: "italic",
  },
  input: {
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: "#0A77E4",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default AddReportModal;
