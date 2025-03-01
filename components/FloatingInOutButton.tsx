import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Text,
  View,
  TouchableHighlight,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location"; // Import expo-location

const FloatingInOutButton: React.FC<{ onPress: () => void }> = ({
  onPress,
}) => {
  const [isTimerOn, setIsTimerOn] = useState(false); // State to track timer status
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const scaleValue = new Animated.Value(1); // Animation value for scaling
  const rotateValue = new Animated.Value(0); // Animation value for rotating gradient
  const floatValue = new Animated.Value(0); // Animation value for floating effect

  // Rotating gradient animation
  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    return () => rotateAnimation.stop();
  }, []);

  // Floating animation
  useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    floatAnimation.start();

    return () => floatAnimation.stop();
  }, []);

  const handlePress = () => {
    // Show the modal when the button is pressed
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      // Permission granted, get the current location
      const location = await Location.getCurrentPositionAsync({});
      console.log("User Location:", location);

      // Toggle the timer state
      setIsTimerOn((prev) => !prev);

      // Trigger scaling animation
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Close the modal
      setIsModalVisible(false);

      // Call the onPress prop if needed
      onPress();
    } else {
      // Permission denied
      console.log("Location permission denied");
      setIsModalVisible(false); // Close the modal if permission is denied
    }
  };

  const handleCancel = () => {
    // Close the modal without changing the timer state
    setIsModalVisible(false);
  };

  // Interpolate rotation for gradient
  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Interpolate floating effect
  const floatInterpolation = floatValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10], // Move up and down by 10 units
  });

  return (
    <>
      {/* Floating Button */}
      <Animated.View
        style={[
          styles.floatingButtonContainer,
          { transform: [{ translateY: floatInterpolation }] },
        ]}
      >
        {/* Gradient Outline (using Animated.View) */}
        <Animated.View
          style={[
            styles.gradientOutline,
            { transform: [{ rotate: rotateInterpolation }] },
          ]}
        >
          <View style={styles.gradient} />
        </Animated.View>

        {/* Button */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            {isTimerOn ? (
              <MaterialIcons name="timer-off" size={40} color="#FF9999" />
            ) : (
              <MaterialIcons name="timer" size={40} color="#ffffff" />
            )}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {/* Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {isTimerOn
                ? "Are you sure you want to time out?"
                : "Are you sure you want to time in?"}
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableHighlight
                style={[styles.modalButton, styles.yesButton]}
                onPress={handleConfirm}
                underlayColor="#DDDDDD"
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.modalButton, styles.noButton]}
                onPress={handleCancel}
                underlayColor="#DDDDDD"
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    top: 560,
    right: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientOutline: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#0b9ca7",
    position: "absolute",
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "transparent",
  },
  floatingButton: {
    width: 70, // Adjust based on icon size
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0b9ca7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "rgba(232, 223, 223, 0.95)",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  yesButton: {
    backgroundColor: "#0b9ca7",
  },
  noButton: {
    backgroundColor: "#a9a9a9",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default FloatingInOutButton;
