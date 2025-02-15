import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type CustomButtonProps = {
  iconName: string;
  buttonText: string;
  onPress: () => void;
};

// Button Component
const CustomButton: React.FC<CustomButtonProps> = ({
  iconName,
  buttonText,
  onPress,
}) => {
  return (
    <View style={styles.buttonContainer}>
      {/* Black strip on the left side (10% width) */}
      <View style={styles.blackStrip}>
        <MaterialIcons name={iconName} size={24} color="#fff" />
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Explore Component
const Explore = () => {
  const handleLocation = () => {
    console.log("Location clicked");
    // Add your logic here
  };

  const handleCalendar = () => {
    console.log("Calendar clicked");
    // Add your logic here
  };

  const handleTime = () => {
    console.log("Time clicked");
    // Add your logic here
  };

  return (
    <View>
      <CustomButton
        iconName="location-on"
        buttonText="Location"
        onPress={handleLocation}
      />

      <CustomButton
        iconName="calendar-today"
        buttonText="Calendar"
        onPress={handleCalendar}
      />

      <CustomButton
        iconName="access-time"
        buttonText="Time"
        onPress={handleTime}
      />
    </View>
  );
};

// Get the screen width
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 5,
    flexDirection: "row", // Ensure the black strip and button are in a row
    alignItems: "center", // Center items vertically
  },
  blackStrip: {
    width: screenWidth * 0.18, // 10% of the screen width
    backgroundColor: "#0b9ca7", // Black color
    height: "100%", // Full height of the container
    borderTopLeftRadius: 15, // Match the container's border radius
    borderBottomLeftRadius: 15,
    alignItems: "center", // Center icon horizontally
    paddingVertical: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    flex: 1, // Take up the remaining space
  },
  buttonText: {
    fontSize: 17,
    color: "#000",
    marginLeft: 20,
  },
});

export default Explore;
