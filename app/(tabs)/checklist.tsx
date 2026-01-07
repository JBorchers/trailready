import { ProgressBar } from "@/components/progress-bar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Keyboard, Pressable, TextInput, View, } from "react-native";


type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

const STORAGE_KEY = "@trailready/checklist/hiking/v1";

function makeId() {
  // Simple, reliable id without extra deps
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChecklistScreen() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const textColor = useThemeColor({}, "text");

  const checkedCount = useMemo(
    () => items.filter((i) => i.checked).length,
    [items]
  );

  const progress = items.length === 0 ? 0 : checkedCount / items.length;
  const progressLabel = `${Math.round(progress * 100)}%`;


  // Load once
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as ChecklistItem[];
          setItems(parsed);
        } else {
          setItems([]); // user-created, so start empty
        }
      } catch (e) {
        console.warn("Failed to load checklist:", e);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Save whenever items change (after initial load)
  useEffect(() => {
    if (isLoading) return;
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn("Failed to save checklist:", e);
      }
    })();
  }, [items, isLoading]);

  function addItem() {
    const label = newLabel.trim();
    if (!label) return;

    setItems((prev) => [
      { id: makeId(), label, checked: false },
      ...prev,
    ]);
    setNewLabel("");
    Keyboard.dismiss();
  }

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearAll() {
    if (items.length === 0) return;

    Alert.alert(
      "Clear checklist?",
      "This will delete all items from this checklist on this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => setItems([]),
        },
      ]
    );
  }

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <ThemedText type="title">Checklist</ThemedText>
        <ThemedText style={{ marginTop: 6, opacity: 0.8 }}>
          {items.length === 0
            ? "Add items to build your hiking pack list."
            : `${checkedCount}/${items.length} packed`}
            <View style={{ marginTop: 10, alignSelf: "stretch", width: "100%" }}>
              <ProgressBar value={progress} />
              <ThemedText style={{ marginTop: 6, opacity: 0.8 }}>
                {progressLabel}
              </ThemedText>
            </View>

        </ThemedText>
      </View>

      {/* Add item */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
        <TextInput
          value={newLabel}
          onChangeText={setNewLabel}
          placeholder="Add an item (e.g., Water)"
          placeholderTextColor="#888"
          onSubmitEditing={addItem}
          returnKeyType="done"
          style={{
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "rgba(120,120,120,0.35)",
            borderRadius: 10,
            color: textColor
          }}
        />
        <Pressable
          onPress={addItem}
          style={{
            paddingHorizontal: 14,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "rgba(120,120,120,0.35)",
            borderRadius: 10,
          }}
        >
          <ThemedText>Add</ThemedText>
        </Pressable>
      </View>

      {/* Actions */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        <Pressable
          onPress={clearAll}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "rgba(120,120,120,0.35)",
            borderRadius: 10,
          }}
        >
          <ThemedText>Clear all</ThemedText>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <ThemedText style={{ opacity: 0.7, marginTop: 12 }}>
            No items yet. Add your first one above.
          </ThemedText>
        }
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "stretch",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(120,120,120,0.18)",
              }}
            >
              <Pressable
                onPress={() => toggleItem(item.id)}
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <ThemedText style={{ marginRight: 12 }}>
                  {item.checked ? "☑" : "☐"}
                </ThemedText>
                <ThemedText
                  style={{
                    textDecorationLine: item.checked ? "line-through" : "none",
                    opacity: item.checked ? 0.55 : 1,
                  }}
                >
                  {item.label}
                </ThemedText>
              </Pressable>

              <Pressable
                onPress={() => deleteItem(item.id)}
                style={{ paddingHorizontal: 10, paddingVertical: 6 }}
                accessibilityLabel={`Delete ${item.label}`}
              >
                <ThemedText style={{ opacity: 0.8 }}>Delete</ThemedText>
              </Pressable>
            </View>
          );
        }}
      />
    </ThemedView>
  );
}
