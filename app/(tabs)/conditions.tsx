import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";

export default function ConditionsScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Conditions</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        Placeholder for weather + trail notes (coming soon).
      </ThemedText>
    </ThemedView>
  );
}
