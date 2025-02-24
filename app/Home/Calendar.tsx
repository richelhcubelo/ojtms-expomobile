import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NoNotifHeader from "@/components/NoNotifHeader";

const Calendar = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <NoNotifHeader
        title="Calendar"
        showBackButton={true}
        onBackPress={handleGoBack}
      />
      <Text style={styles.text}>Calendar Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Calendar;
