import React, { FC, useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import { colors } from "./theme";

interface ProgressBarProps {
  progress: number;
  fullWidth?: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  progress = 0,
  fullWidth,
}) => {
  const [animation] = useState(new Animated.Value(progress));
  const animationRef = useRef(
    Animated.timing(animation, {
      useNativeDriver: false,
      toValue: progress,
    })
  );
  const widthInterpolate = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const animatedWidthStyle = {
    width: widthInterpolate,
  };
  const containerStyle = fullWidth
    ? [styles.container, styles.fullWidth]
    : [styles.container];

  useEffect(() => {
    const startAnimation = () => {
      animationRef.current.stop();
      animationRef.current = Animated.timing(animation, {
        toValue: progress,
        duration: 2000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      });
      animationRef.current.start();
    };
    startAnimation();
  }, [progress]);

  return (
    <View style={containerStyle}>
      <Animated.View style={[styles.bar, animatedWidthStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 64,
    backgroundColor: colors["gray.700"],
  },
  bar: {
    borderRadius: 64,
    height: "100%",
    backgroundColor: colors.secondary,
  },
  fullWidth: {
    width: "100%",
  },
});
