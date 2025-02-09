import { Tabs } from "expo-router";
import React from "react";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons"; // Import the icons directly
import TabBar from "@/components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color || "white"} />
          ),
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          title: "Upload",
          tabBarIcon: ({ color }) => (
            <AntDesign name="clouduploado" size={24} color={color || "white"} />
          ),
        }}
      />

      <Tabs.Screen
        name="dtr"
        options={{
          title: "DTR",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-clock-outline"
              size={24}
              color={color || "white"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
