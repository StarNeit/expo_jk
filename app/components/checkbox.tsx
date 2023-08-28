import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import { CheckmarkSvg } from "~assets/icons/checkmark";

import { colors } from "./theme";

interface CheckboxProps {
  isChecked: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({ isChecked }) => {
  return (
    <View style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}>
      {isChecked && <CheckmarkSvg />}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors["gray.700"],
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    borderWidth: 1.5,
    borderColor: "#492673",
    backgroundColor: colors.primary,
  },
});
