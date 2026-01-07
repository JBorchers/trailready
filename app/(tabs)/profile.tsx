import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";

export default function ProfileScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        Preferences, saved checklists, and activity defaults.
      </ThemedText>
    </ThemedView>
  );
}
