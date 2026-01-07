import React, { useState } from "react";
import { Pressable } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HIKING_GEAR } from "@/constants/gear";

export default function ChecklistScreen() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggleItem(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Hiking Checklist</ThemedText>

      {HIKING_GEAR.map((item) => {
        const isChecked = checked.has(item.id);

        return (
          <Pressable
            key={item.id}
            onPress={() => toggleItem(item.id)}
            style={{
              paddingVertical: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ThemedText style={{ marginRight: 12 }}>
              {isChecked ? "☑" : "☐"}
            </ThemedText>
            <ThemedText
              style={{
                textDecorationLine: isChecked ? "line-through" : "none",
                opacity: isChecked ? 0.5 : 1,
              }}
            >
              {item.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}
