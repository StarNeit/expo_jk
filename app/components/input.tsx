import React, { FC, useState } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

import { withColor } from "./communStyles/withColor";
import { colors, ColorsKey } from "./theme";

interface InputProps extends TextInputProps {
  value: string;
  setValue: (value: string) => void;
  bg?: ColorsKey;
}

const Input: FC<InputProps> = (props) => {
  const { bg, value, setValue } = props;

  const [isFocused, setIsFocused] = useState(false);

  const dynamicStyles = getDynamicStyles(isFocused, bg);

  return (
    <TextInput
      editable
      {...props}
      maxLength={props.maxLength || 99}
      onChangeText={setValue}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => setIsFocused(false)}
      value={value}
      style={[dynamicStyles.input, props.style]}
    />
  );
};

const getDynamicStyles = (isFocused: boolean, bg?: ColorsKey) =>
  StyleSheet.create({
    input: {
      fontSize: 18,
      textAlignVertical: "center",
      backgroundColor: bg,
      borderColor: isFocused ? colors.primary : colors["gray.700"],
      borderWidth: 1.8,
      borderRadius: 12,
      minHeight: 60,
      paddingTop: 16,
      paddingBottom: 16,
      paddingHorizontal: 22,
      color: colors.white,
      fontFamily: "Poppins-Regular",
    },
  });

const InputWithColor = withColor(Input);

export { InputWithColor as Input };
