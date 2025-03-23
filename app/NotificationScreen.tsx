import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import NoNotifHeader from "@/components/NoNotifHeader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "@/config";

type NotificationType =
  | "REMINDERS"
  | "GENERAL ANNOUNCEMENT"
  | "URGENT"
  | "POLICY ANNOUNCEMENT";

interface Announcement {
  id: number;
  type: NotificationType;
  date: string;
  content: string;
}

const NotificationScreen: React.FC = () => {
  const router = useRouter();
  const [selectedNotification, setSelectedNotification] =
    useState<Announcement | null>(null);
  const [clickedNotifications, setClickedNotifications] = useState<number[]>(
    []
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAnnouncements = async () => {
      try {
        const studentId = await AsyncStorage.getItem("student_id");
        if (!studentId) {
          throw new Error("Student ID not found in AsyncStorage");
        }

        const response = await fetch(
          `${Config.API_BASE_URL}/api/latest-announcement?student_id=${studentId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch announcements");
        }

        const transformedData: Announcement[] = data.announcements.map(
          (item: any) => ({
            id: item.announce_id,
            type: item.announcement_type,
            date: item.announcement_date,
            content: item.announcement_content,
          })
        );

        if (isMounted) {
          setAnnouncements(transformedData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
          setAnnouncements([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    setLoading(true);
    fetchAnnouncements();

    // Set up polling every 30 seconds
    const intervalId = setInterval(fetchAnnouncements, 30000);

    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "REMINDERS":
        return (
          <MaterialCommunityIcons
            name="reminder"
            size={30}
            color="#0b9ca7"
            style={styles.icon}
          />
        );
      case "GENERAL ANNOUNCEMENT":
        return (
          <AntDesign
            name="notification"
            size={30}
            color="#0b9ca7"
            style={styles.icon}
          />
        );
      case "URGENT":
        return (
          <MaterialCommunityIcons
            name="clock-fast"
            size={30}
            color="#0b9ca7"
            style={styles.icon}
          />
        );
      case "POLICY ANNOUNCEMENT":
        return (
          <Ionicons
            name="notifications-circle"
            size={30}
            color="#0b9ca7"
            style={styles.icon}
          />
        );
      default:
        return (
          <MaterialCommunityIcons
            name="bell-circle"
            size={30}
            color="#0b9ca7"
            style={styles.icon}
          />
        );
    }
  };

  const handleNotificationClick = (notification: Announcement) => {
    setSelectedNotification(notification);
    if (!clickedNotifications.includes(notification.id)) {
      setClickedNotifications([...clickedNotifications, notification.id]);
    }
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <View style={styles.container}>
      <NoNotifHeader
        title="Notifications"
        showBackButton={true}
        onBackPress={() => router.back()}
      />
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0b9ca7"
            //style={styles.loader}
          />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : announcements.length === 0 ? (
          <Text style={styles.noAnnouncementsText}>No announcements found</Text>
        ) : (
          announcements.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationBox,
                {
                  backgroundColor: clickedNotifications.includes(
                    notification.id
                  )
                    ? "#fff"
                    : "#e3f2fd",
                },
              ]}
              onPress={() => handleNotificationClick(notification)}
            >
              {getIcon(notification.type)}
              <View style={styles.notificationContent}>
                <Text style={styles.notificationType}>{notification.type}</Text>
                <Text style={styles.notificationDate}>{notification.date}</Text>
                <Text style={styles.notificationText} numberOfLines={2}>
                  {notification.content}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal
        visible={selectedNotification !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedNotification?.type}</Text>
            <Text style={styles.modalDate}>{selectedNotification?.date}</Text>
            <Text style={styles.modalText}>
              {selectedNotification?.content}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  notificationBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 100, // Fixed height
  },
  icon: {
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationType: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  notificationDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  notificationText: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  modalDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  modalText: {
    fontSize: 16,
    color: "#444",
    marginTop: 8,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#0b9ca7",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  noAnnouncementsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NotificationScreen;
