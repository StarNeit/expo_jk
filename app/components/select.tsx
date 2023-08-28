import React, { useState, FC } from "react";
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from "react-native-dropdown-picker";
import { colors } from "~components/theme";
import { StyleSheet } from "react-native";

type SelectProps = DropDownPickerProps<ValueType>;

export const Select: FC<SelectProps> = ({ items, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dynamicStyles = getDynamicStyles(isFocused);

  return (
    <DropDownPicker
      items={items}
      style={dynamicStyles.input}
      textStyle={dynamicStyles.text}
      dropDownContainerStyle={dynamicStyles.dropdown}
      onOpen={() => setIsFocused(true)}
      onClose={() => setIsFocused(false)}
      {...rest}
      open={open}
      setOpen={setOpen}
    />
  );
};

const getDynamicStyles = (isFocused: boolean) =>
  StyleSheet.create({
    input: {
      backgroundColor: colors["gray.800"],
      borderColor: isFocused ? colors.primary : colors["gray.700"],
      borderWidth: 1.8,
      borderRadius: 12,
      minHeight: 60,
      paddingTop: 16,
      paddingBottom: 16,
      paddingHorizontal: 22,
    },
    text: {
      color: colors.white,
      fontFamily: "Poppins-Regular",
      fontSize: 18,
      textAlignVertical: "center",
    },
    dropdown: {
      backgroundColor: colors["gray.600"],
    },
  });
