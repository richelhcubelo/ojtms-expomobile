import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Overlay } from "@/app/scanner/Overlay";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For local storage access
import { getCurrentPositionAsync } from "expo-location"; // To fetch the location
import axios from "axios";
import { useRouter } from "expo-router"; // Importing useRouter
import Config from "@/config";

export default function ScanScreen() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [studentId, setStudentId] = useState<string | null>(null); // To store studentId
  const [location, setLocation] = useState<any>(null); // To store location data
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const getStudentId = async () => {
      try {
        const studentId = await AsyncStorage.getItem("student_id");
        if (studentId) {
          setStudentId(studentId); // Set student ID in state
        }
      } catch (error) {
        console.error("Error retrieving student ID:", error);
      }
    };

    getStudentId(); // Call to get studentId

    // Get the user's current location
    const getLocation = async () => {
      try {
        const location = await getCurrentPositionAsync({});
        setLocation(location.coords); // Store location data
      } catch (error) {
        console.error("Error retrieving location:", error);
      }
    };

    getLocation(); // Fetch location when the screen loads

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleScan = async (qrData: string) => {
    if (qrData && !qrLock.current && studentId && location) {
      qrLock.current = true;
      const companyQr = qrData;

      try {
        // Send API request with QR scan data, studentId, and location
        const response = await axios.post(
          `${Config.API_BASE_URL}/student/scan`, // Replace with actual backend URL
          {
            studentId: studentId,
            companyQr: companyQr,
            scanTime: new Date().toISOString(),
            address: `${location.latitude}, ${location.longitude}`, // Send coordinates
          }
        );

        if (response.data.message) {
          console.log("Scan successful:", response.data.message);
          router.back(); // Navigate back after successful scan
        }
      } catch (error) {
        console.error("Scan failed:", error);
        // Handle error if company not found or timesheet could not be created
      }

      // Lock QR scanning for a brief period to prevent duplicate scans
      setTimeout(() => {
        qrLock.current = false;
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => handleScan(data)} // Call handleScan on barcode scan
      />
      <Overlay />
    </SafeAreaView>
  );
}
