import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { View } from "react-native";

type Props = {
  value: number; // 0..1
  height?: number;
};

export function ProgressBar({ value, height = 10 }: Props) {
  const clamped = Math.max(0, Math.min(1, value));

  const trackColor = useThemeColor({}, "background");
  const fillColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "text");

  return (
    <View
      style={{
        height,
        borderRadius: height / 2,
        overflow: "hidden",
        backgroundColor: trackColor,
        borderWidth: 1,
        borderColor: borderColor,
        opacity: 0.25, // keeps the track subtle in both themes
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${clamped * 100}%`,
          backgroundColor: fillColor,
          opacity: 1,
        }}
      />
    </View>
  );
}
