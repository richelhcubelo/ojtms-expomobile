import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationIcon: React.FC = () => {
  return (
    <TouchableOpacity>
      <Ionicons
        name="notifications-outline"
        size={24}
        color="#fff"
        style={styles.notificationIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationIcon: {
    marginLeft: 10,
    marginHorizontal: 5,
  },
});

export default NotificationIcon;
