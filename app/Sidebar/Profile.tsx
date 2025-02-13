import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface ProfileProps {
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  return (
    <View style={styles.overlay}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/profilesample.png")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Sansai</Text>
          <Text style={styles.phone}>+919876543210</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Student Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Company Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onClose}>
            <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 1000, // Ensure this is higher than the tab bar
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  phone: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 18,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default Profile;
