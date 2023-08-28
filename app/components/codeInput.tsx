import React, { FC, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { colors } from "~components/theme";

const CODE_LENGTH = 4;

interface CodeInputProps {
  setCurrentCode: (code: string) => void;
}

export const CodeInput: FC<CodeInputProps> = ({ setCurrentCode }) => {
  const [code, setCode] = useState("");
  const [containerIsFocused, setContainerIsFocused] = useState(false);

  const codeDigitsArray = new Array(CODE_LENGTH).fill(undefined);

  const ref = useRef<TextInput>(null);

  const handleOnPress = () => {
    setContainerIsFocused(true);
    if (ref.current) {
      ref.current.focus();
    } else {
      console.error("Ref is not assigned.");
    }
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
    setCurrentCode(code);
  };

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = "";
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...style.inputContainer, ...style.inputContainerFocused }
        : style.inputContainer;

    return (
      <View key={idx} style={containerStyle}>
        {digit ? (
          <Text style={style.inputText}>{digit}</Text>
        ) : (
          <Text style={style.inputPlaceHolderText}>0</Text>
        )}
      </View>
    );
  };

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.inputsContainer}
        activeOpacity={1}
        onPressIn={handleOnPress}
      >
        {codeDigitsArray.map(toDigitInput)}
      </TouchableOpacity>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        pointerEvents="none"
        style={[style.hiddenCodeInput, { zIndex: -1 }]}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  inputsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: 68,
    height: 68,
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainerFocused: {
    borderColor: colors.primary,
  },
  inputText: {
    fontSize: 36,
    color: colors["gray.50"],
    fontFamily: "Poppins-Regular",
  },
  inputPlaceHolderText: {
    fontSize: 36,
    color: colors["gray.500"],
    fontFamily: "Poppins-Regular",
  },
  hiddenCodeInput: {
    position: "absolute",
    opacity: 0,
  },
});
