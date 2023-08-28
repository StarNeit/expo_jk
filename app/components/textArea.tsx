import React, { FC, useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";

import { Text } from "~components/text";
import { PenSvg } from "~assets/icons/pen";

import { withColor } from "./communStyles/withColor";
import { colors, ColorsKey } from "./theme";
import { Dimensions } from "react-native";

interface TextAreaProps {
  value: string;
  label?: string;
  placeholder?: string;
  placeholderColor?: string;
  maxLength?: number;
  bg?: ColorsKey;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  maxLength,
  placeholder,
  placeholderColor,
  bg,
  value,
  setValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const dynamicStyles = getDynamicStyles(isFocused, bg, label);

  const characterRemaining = (maxLength || 0) - value.length;
  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View>
      <TextInput
        editable
        multiline
        maxLength={maxLength || 9999}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor || "#fff"}
        value={value}
        style={[dynamicStyles.textArea]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {label && (
        <View style={dynamicStyles.labelContainer}>
          <Text
            color="gray.400"
            numberOfLines={1}
            fontFamily="Poppins-Medium"
            fontSize={12}
            style={{ width: Dimensions.get("window").width - 100 }}
          >
            {label}
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <PenSvg />
          </View>
        </View>
      )}
      {maxLength && (
        <Text color="gray.500" textAlign="right" mt={8}>
          {characterRemaining} caractères restant
        </Text>
      )}
    </View>
  );
};

const getDynamicStyles = (isFocused: boolean, bg?: string, label?: string) =>
  StyleSheet.create({
    container: {
      position: "relative",
    },
    textArea: {
      textAlignVertical: "top",
      backgroundColor: bg,
      borderColor: isFocused ? colors.primary : colors["gray.100"],
      borderWidth: 1.8,
      borderRadius: 12,
      minHeight: 188,
      paddingTop: label ? 48 : 26,
      paddingBottom: 10,
      paddingHorizontal: 22,
      color: colors.white,
    },
    labelContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      top: 26,
      paddingHorizontal: 22,
    },
  });

const TextAreaWithColor = withColor(TextArea);

export { TextAreaWithColor as TextArea };
