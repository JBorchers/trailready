import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";

export default function ChecklistScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Checklist</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        Hiking MVP: pack list + readiness basics.
      </ThemedText>
    </ThemedView>
  );
}
