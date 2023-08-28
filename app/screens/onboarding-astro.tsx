import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Layout } from "~components/layout";
import { ProgressBar } from "~components/progressBar";
import { Input } from "~components/input";
import { Text } from "~components/text";
import { Switch } from "~components/switch";
import {
  AutocompleteInput,
  AutocompleteInputItem,
} from "~components/autocompleteInput";
import { useSearchPlaces } from "~hooks/useSearchPlaces";
import { useDebounce } from "usehooks-ts";
import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Alert } from "~components/alert";
import { Button } from "~components/button";
import { RightChevronSvg } from "~assets/icons/rightChevron";
import { Select } from "~components/select";

const STATUS_ITEMS = [
  {
    label: "16h30",
    value: "16h30",
  },
  {
    label: "16h31",
    value: "16h31",
  },
];

export const OnboardingAstroScreen: FC = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [enablePas, setEnablePas] = useState(false);

  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const debouncedSearchValue = useDebounce<string>(name, 300);

  const { places } = useSearchPlaces({ name: debouncedSearchValue });

  const generateAutocompleteMenuItems = (): AutocompleteInputItem[] => {
    return (
      places?.map((item) => ({
        value: item.id,
        label: `${item.name}, ${item.admin_name} ${item.country}`,
      })) ?? []
    );
  };

  const handleChangeDatePicker = (
    _: DateTimePickerEvent,
    value: Date | undefined
  ) => {
    if (value) setDate(value);
    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    console.log("[Submit button is clicked]");
  };

  return (
    <Layout statusStyle="light">
      <View style={styles.container}>
        <ProgressBar progress={36} />

        <View style={styles.header}>
          <Text color="white" fontSize={36}>
            Ton astro
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text color="white" fontSize={16}>
              To date de nassaince
            </Text>
            <Input
              bg="gray.800"
              value={date?.toDateString() ?? ""}
              onPressIn={() => setShowDatePicker(true)}
            />
          </View>

          <View style={[styles.row, styles.autocomplete]}>
            <Text color="white" fontSize={16}>
              Ton lieu de naissance
            </Text>
            <AutocompleteInput
              onChangeSearchValue={setName}
              items={generateAutocompleteMenuItems()}
              placeholder="Enter the film title"
            />
          </View>

          <View style={[styles.row, styles.relative]}>
            <Text color="white" fontSize={16}>
              Ton heure de naissance
            </Text>
            <Text color="gray.300" fontSize={14} mb={14}>
              Le plus précis tu seras dans ton heure de naissaince, plus seront
              précisent tes infos astro.
            </Text>
            {!enablePas && (
              <Select
                items={STATUS_ITEMS}
                value={status}
                setValue={setStatus}
              />
            )}
          </View>

          <View style={styles.switch}>
            <Text color="gray.300" fontSize={16}>
              Je ne sais pas
            </Text>
            <Switch isEnabled={enablePas} onChange={setEnablePas} />
          </View>
          {enablePas && (
            <Text color="gray.600" fontSize={14} mb={10}>
              Nous mettons alors 12h00, tu pourras changer au moment quand tu
              seras sur les réglages de ton profil.
            </Text>
          )}
          <Alert>
            Ces informations ne seront pas affichées sur ton profil.
          </Alert>
        </View>

        <View style={styles.bottomAction}>
          <Button
            onPress={handleSubmit}
            onlyIcon
            variant="gradient"
            fullWidth={false}
            rounded
          >
            <RightChevronSvg />
          </Button>
        </View>
      </View>

      {showDatePicker && (
        <DatePicker
          value={date ?? new Date()}
          onChange={handleChangeDatePicker}
          display="spinner"
          themeVariant="dark"
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  row: {
    marginBottom: 24,
  },
  autocomplete: {
    position: "relative",
    zIndex: 3,
  },
  relative: {
    position: "relative",
    zIndex: 1,
  },
  switch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  bottomAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
