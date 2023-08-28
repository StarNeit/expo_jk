import React, { FC } from "react";
import { colors } from "./theme";
import { StyleSheet, View } from "react-native";
import { EyeSvg } from "~assets/icons/eye";
import { Text } from "~components/text";

interface AlertProps {
  children: React.ReactNode;
}

export const Alert: FC<AlertProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <EyeSvg />
      <Text color="white" fontSize={14} ml={10}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: colors.black,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },
});
