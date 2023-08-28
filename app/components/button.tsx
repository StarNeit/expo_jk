import React, { FC } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewProps as ViewPropsRN,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import { colors } from "./theme";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "gradient"
  | "transparent"
  | "black"
  | "grey";

interface VariantStyles {
  backgroundColor?: string;
  textColor: string;
  gradientColors?: string[];
}

const variantStyles: Record<ButtonVariant, VariantStyles> = {
  primary: {
    backgroundColor: colors.primary,
    textColor: colors.white,
  },
  secondary: {
    backgroundColor: colors.secondary,
    textColor: colors.green,
  },
  gradient: {
    gradientColors: ["#BC04FD", "#3A7ED6", "#20CAD7"],
    textColor: colors.white,
  },
  transparent: {
    backgroundColor: colors.transparent,
    textColor: colors.white,
  },
  black: {
    backgroundColor: colors.black,
    textColor: colors.white,
  },
  grey: {
    backgroundColor: colors["gray.700"],
    textColor: colors.white,
  },
};

interface ButtonProps extends ViewPropsRN {
  children: React.ReactNode;
  onlyIcon?: boolean;
  variant?: ButtonVariant;
  weight?: "medium" | "bold";
  fontSize?: "md" | "lg";
  paddingVertical?: 14 | 18 | 20;
  fullWidth?: boolean;
  rounded?: boolean;
  onPress: () => void;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    onlyIcon,
    variant = "primary",
    fullWidth = false,
    weight = "medium",
    fontSize = "md",
    paddingVertical = 20,
    rounded,
    onPress,
  } = props;

  const {
    backgroundColor,
    textColor,
    gradientColors = ["#000", "#000"],
  } = variantStyles[variant];

  const styles = getDynamicStyles(onlyIcon);

  const buttonStyle = fullWidth
    ? [
        styles.button,
        styles.fullWidthButton,
        { backgroundColor, paddingVertical },
      ]
    : [
        styles.button,
        rounded && styles.rounded,
        { backgroundColor, paddingVertical },
      ];

  const textWeight =
    weight === "medium" ? "Poppins-Medium" : "Poppins-SemiBold";

  const textSize = fontSize === "md" ? 16 : 18;

  if (variant === "gradient") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          fullWidth && styles.fullWidthButton,
          styles.shadow,
          props.style,
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0.8, y: -0.5 }}
          end={{ x: 0.7, y: 2 }}
          locations={[0, 0.5331, 1]}
          style={buttonStyle}
        >
          <LinearGradient
            colors={[
              "rgba(255,253,253, 0.25)",
              "rgba(255,253,253, 0)",
              "rgba(255,253,253, 0)",
              "rgba(255,253,253, 0)",
              "rgba(255,253,253, 0)",
              "rgba(48,124,177, 0)",
              "rgba(48,124,177, 0.2)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 32,
            }}
          />
          {onlyIcon ? (
            children
          ) : (
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  fontSize: textSize,
                  fontFamily: textWeight,
                },
              ]}
            >
              {children}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  if (variant === "transparent") {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[fullWidth && styles.fullWidthButton]}
      >
        <BlurView
          intensity={50}
          tint="dark"
          style={[buttonStyle, { overflow: "hidden" }]}
        >
          <Text
            style={[
              styles.text,
              {
                color: textColor,
                fontSize: textSize,
                fontFamily: textWeight,
              },
            ]}
          >
            {children}
          </Text>
        </BlurView>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {onlyIcon ? (
        children
      ) : (
        <Text
          style={[
            styles.text,
            { color: textColor, fontFamily: textWeight, fontSize: textSize },
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getDynamicStyles = (onlyIcon?: boolean) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: 20,
      borderRadius: onlyIcon ? 50 : 32,
      alignItems: "center",
    },
    shadow: {
      shadowColor: "rgba(35, 108, 217, 1)", // IOS
      shadowOffset: { height: 6, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 20, //IOS
    },
    text: {
      fontSize: 16,
    },
    fullWidthButton: {
      width: "100%",
    },
    rounded: {
      width: 64,
      height: 64,
    },
  });
