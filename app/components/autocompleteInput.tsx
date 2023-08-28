import React, { useState, FC } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Input } from "~components/input";
import { Text } from "~components/text";
import { colors } from "./theme";

export interface AutocompleteInputItem {
  value: string;
  label: string;
}

interface AutocompleteInputProps {
  onChangeSearchValue: (value: string) => void;
  items: AutocompleteInputItem[];
  onSelectValue?: (item: AutocompleteInputItem) => void;
  placeholder?: string;
}

export const AutocompleteInput: FC<AutocompleteInputProps> = ({
  onChangeSearchValue,
  items,
  onSelectValue,
  placeholder,
}) => {
  const [displayedValue, setDisplayedValue] = useState<string>("");
  const [hideResult, setHideResult] = useState<boolean>(false);

  const handleSelectItem = (item: AutocompleteInputItem) => {
    setDisplayedValue(item.label);
    onSelectValue?.(item);
    setHideResult(true);
  };

  const handleChangeDisplayedValue = (value: string) => {
    setDisplayedValue(value);
    onChangeSearchValue(value);
    setHideResult(false);
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        inputContainerStyle={styles.inputContainer}
        renderTextInput={() => (
          <Input
            value={displayedValue}
            setValue={handleChangeDisplayedValue}
            bg="gray.800"
            placeholder={placeholder}
            placeholderTextColor={colors["gray.500"]}
          />
        )}
        data={items}
        value={displayedValue}
        clearTextOnFocus
        hideResults={hideResult}
        renderResultList={() => (
          <View style={styles.resultListContainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {items.slice(0, 5).map((item, index) => (
                <TouchableOpacity
                  style={styles.item}
                  key={index}
                  onPress={() => handleSelectItem(item)}
                >
                  <Text color="white">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        listContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
  },
  listContainer: {
    backgroundColor: colors["gray.700"],
    borderRadius: 8,
    marginTop: 4,
    zIndex: 10,
    position: "relative",
  },
  resultListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 210,
  },
  inputContainer: {
    borderWidth: 0,
  },
  item: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors["gray.500"],
  },
});
