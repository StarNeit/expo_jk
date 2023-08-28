import React, { FC, useState } from "react";
import { Slider as SliderRN } from "@miblanchard/react-native-slider";
import { StyleSheet, View } from "react-native";

import { Text } from "~components/text";
import { colors } from "./theme";

interface SliderContainerProps {
  caption: string;
  children: React.ReactElement;
  sliderValue: Array<number> | number;
  unit: string;
}

const SliderContainer: FC<SliderContainerProps> = ({
  caption,
  children,
  sliderValue,
  unit,
}) => {
  const [value, setValue] = useState(sliderValue);

  const renderChildren = () => {
    return React.Children.map(children, (child: React.ReactElement) => {
      if (!!child && child.type === SliderRN) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          value,
        });
      }

      return child;
    });
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text color="white" fontFamily="Poppins-Medium" fontSize={16}>
          {caption}
        </Text>
        <Text color="gray.400" fontSize={16}>
          {Array.isArray(value) ? value.join(" - ") : value} {unit}
        </Text>
      </View>
      {renderChildren()}
    </View>
  );
};

interface CommonRangeProps {
  caption: string;
  unit: string;
  minValue: number;
  maxValue: number;
}

interface RangeProps extends CommonRangeProps {
  value: number;
  onSelect: (value: number) => void;
}

export const Range: FC<RangeProps> = ({
  caption,
  unit,
  minValue,
  maxValue,
  value,
  onSelect,
}) => {
  return (
    <SliderContainer caption={caption} sliderValue={value} unit={unit}>
      <SliderRN
        value={value}
        minimumValue={minValue}
        maximumValue={maxValue}
        onSlidingComplete={(value) => onSelect(value[0])}
        step={1}
        trackClickable={true}
        thumbTintColor={colors.primary}
        maximumTrackTintColor={colors.gray}
        minimumTrackTintColor={colors.primary}
      />
    </SliderContainer>
  );
};

interface DoubleRangeProps extends CommonRangeProps {
  value: number[];
  onSelect: (value: number[]) => void;
}

export const DoubleRange: FC<DoubleRangeProps> = ({
  caption,
  unit,
  minValue,
  maxValue,
  value,
  onSelect,
}) => {
  return (
    <SliderContainer caption={caption} sliderValue={value} unit={unit}>
      <SliderRN
        animateTransitions
        onSlidingComplete={onSelect}
        maximumTrackTintColor={colors["gray.100"]}
        maximumValue={maxValue}
        minimumTrackTintColor={colors.primary}
        minimumValue={minValue}
        step={1}
        thumbTintColor={colors.primary}
      />
    </SliderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    margin: 16,
    paddingBottom: 32,
  },

  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
