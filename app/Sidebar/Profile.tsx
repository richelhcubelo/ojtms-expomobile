import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons, Entypo, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter from expo-router

interface ProfileProps {
  slideAnim: Animated.Value;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ slideAnim, onClose }) => {
  const router = useRouter(); // Initialize the router
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const profileWidth = screenWidth * 0.2;
  const currentTranslateXRef = React.useRef(0);

  useEffect(() => {
    const listenerId = slideAnim.addListener(({ value }) => {
      currentTranslateXRef.current = value;
    });
    return () => slideAnim.removeListener(listenerId);
  }, [slideAnim]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const isHorizontal =
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        const startX = evt.nativeEvent.pageX;
        const rightEdgeStart = screenWidth * 0.2;
        const isNearRightEdge = startX >= rightEdgeStart - 20;
        return isHorizontal && isNearRightEdge;
      },
      onPanResponderGrant: () => slideAnim.stopAnimation(),
      onPanResponderMove: (_, gestureState) => {
        let dx = Math.max(Math.min(gestureState.dx, 0), -profileWidth);
        slideAnim.setValue(dx);
      },
      onPanResponderRelease: () => {
        const currentTranslateX = currentTranslateXRef.current;
        if (currentTranslateX <= -profileWidth * 0.3) {
          onClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleCompanyDetailsClick = () => {
    console.log("Company Details clicked");
    router.push("/Sidebar/CompanyDetails");
  };

  const handleChangePasswordClick = () => {
    console.log("Change Password clicked");
    router.push("/Sidebar/ChangePassword");
  };

  const handleInfoClick = () => {
    // Pass profile details to the Details screen
    router.push({
      pathname: "/Sidebar/StudentDetails",
      params: {
        name: "Richel Cubelo",
        id: "186744",
        image: require("@/assets/images/profilesample.png"), // Pass the image path
      },
    });
  };

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    router.push("/WelcomeLoginScreen");
  };

  return (
    <Animated.View
      style={[styles.overlay, { transform: [{ translateX: slideAnim }] }]}
      {...panResponder.panHandlers}
    >
      {/* Add a colored background view for the top 30% */}
      <View style={styles.topBackground} />
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <View style={styles.header}>
            <Image
              source={require("@/assets/images/profilesample.png")}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.name_id_icon}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Richel Cubelo</Text>
              <Text style={styles.id}>186744</Text>
            </View>
            <TouchableOpacity style={styles.editIcon} onPress={handleInfoClick}>
              <Octicons name="info" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Company Details</Text>
            <TouchableOpacity onPress={handleCompanyDetailsClick}>
              <Entypo name="chevron-small-right" size={24} color="#0b9ca7" />
            </TouchableOpacity>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Change Password</Text>
            <TouchableOpacity onPress={handleChangePasswordClick}>
              <Entypo name="chevron-small-right" size={24} color="#0b9ca7" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTopText}>Logout</Text>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            {/* Horizontal line above the buttons */}
            <View style={styles.horizontalLine} />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              {/* Vertical line between buttons */}
              <View style={styles.verticalLine} />
              <TouchableOpacity
                style={styles.yesButton}
                onPress={confirmLogout}
              >
                <Text style={styles.yesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "75%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 1.5)",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    height: "100%",
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "32%", // Cover 30% of the height
    backgroundColor: "#0b9ca7", // Your desired color
  },
  header: {
    flexDirection: "row", // Keep as row
    padding: 10,
    top: 10,
  },
  top: {
    top: 40,
  },
  name_id_icon: {
    top: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  nameContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Ensure text is visible on the colored background
  },
  id: {
    fontSize: 15,
    color: "#eee", // Lighter color for visibility
  },
  editIcon: {
    position: "absolute", // Position the edit icon absolutely
    right: 20, // Align to the right
    top: 10, // Align to the top
  },
  menu: {
    marginTop: 90,
  },
  menuItem: {
    flexDirection: "row", // Align text and icon horizontally
    justifyContent: "space-between", // Space between text and icon
    alignItems: "center", // Center items vertically
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 18,
    color: "#0b9ca7",
  },
  logoutButton: {
    backgroundColor: "#0b9ca7",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
    width: "50%",
    height: "23%",
    alignSelf: "center",
    elevation: 10,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },
  modalTopText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    bottom: 10,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    top: 17,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#0b9ca7",
    fontSize: 16,
  },
  yesButton: {
    padding: 10,
    borderRadius: 5,
  },
  yesButtonText: {
    color: "#ff9999",
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: "#ccc", // Light gray color for the line
    borderBottomWidth: 1, // Thickness of the line
    width: "100%", // Full width
    marginBottom: 10, // Space below the line
  },
  verticalLine: {
    borderLeftColor: "#ccc", // Light gray color for the line
    borderLeftWidth: 1, // Thickness of the line
    height: "100%", // Full height of the button container
    marginHorizontal: 10, // Space between the buttons
  },
});

export default Profile;
