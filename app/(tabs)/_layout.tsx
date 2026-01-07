import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="checklist"
        options={{
          title: "Checklist",
          tabBarIcon: ({ color }) => <IconSymbol name="checklist" color={color} />,
        }}
      />

      <Tabs.Screen
        name="conditions"
        options={{
          title: "Conditions",
          tabBarIcon: ({ color }) => <IconSymbol name="cloud.sun.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <IconSymbol name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
