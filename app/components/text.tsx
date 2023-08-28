import React, { FC } from "react";
import {
  Text as TextRN,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps as TextPropsRN,
} from "react-native";

import { withSpacing } from "./communStyles/withSpacing";
import { withColor } from "./communStyles/withColor";
import { ColorsKey, FontFamily } from "./theme";

interface TextProps extends TextPropsRN {
  children: React.ReactNode;
  color?: ColorsKey;
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  fontFamily?: FontFamily;
}

interface Styles {
  text: StyleProp<TextStyle & { fontFamily?: FontFamily }>;
}

const Text: FC<TextProps> = (props) => {
  const {
    children,
    color,
    fontSize,
    fontFamily = "Poppins-Regular",
    lineHeight,
    textAlign,
    numberOfLines,
  } = props;

  const dynamicStyles = getDynamicStyles({
    color,
    fontSize,
    fontFamily,
    lineHeight,
    textAlign,
  });

  return (
    <TextRN
      style={[dynamicStyles.text, props.style]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
    >
      {children}
    </TextRN>
  );
};

const getDynamicStyles = ({
  color,
  fontSize,
  textAlign,
  lineHeight,
  fontFamily,
}: { fontFamily: FontFamily; lineHeight?: number } & Pick<
  TextProps,
  "color" | "fontSize" | "textAlign"
>): Styles => {
  return StyleSheet.create({
    text: {
      color,
      fontSize,
      textAlign,
      fontFamily,
      lineHeight,
    },
  });
};

const TextWithSpacingAndColor = withSpacing(withColor(Text));

export { TextWithSpacingAndColor as Text };
