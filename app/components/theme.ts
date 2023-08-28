export const rawColors = {
  primary: "#AC71F5",
  primaryLight: "#CAABF0",
  primaryDark: "#1B0A30",
  secondary: "#4AF3DF",
  accent: "#276EF1",
  negative: "#E11900",
  warning: "#FFC043",
  positive: "#048848",
  white: "#FFFFFF",
  black: "#000000",
  green: "#094039",
  gray: {
    50: "#F6F6F6",
    100: "#EEEEEE",
    200: "#E2E2E2",
    300: "#CBCBCB",
    400: "#AFAFAF",
    500: "#6B6B6B",
    600: "#545454",
    700: "#333333",
    800: "#1F1F1F",
    900: "#141414",
  },
  blue: {
    50: "#EFF3FE",
  },
  transparent: "#27292550",
};

// Define a type for color shades
interface ColorShades {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

type ColorValues = string | ColorShades;

type FlattenColorType = { [K in keyof typeof rawColors]: string } & {
  [K in `${keyof typeof rawColors}.${keyof ColorShades}`]: string;
};

const flattenColorPalette = (
  colors: Record<string, ColorValues> | undefined
): FlattenColorType => {
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(
      ([color, values]: [string, ColorValues]) =>
        typeof values == "object"
          ? Object.entries(
              flattenColorPalette(values as Record<string, string>)
            ).map(([number, hex]: [string, string]) => ({
              [color + (number === "DEFAULT" ? "" : `.${number}`)]: hex,
            }))
          : [{ [`${color}`]: values }]
    )
  );
};

export const colors = flattenColorPalette(rawColors);

export type ColorsKey = keyof typeof colors;

export type FontFamily =
  | "Poppins-Regular"
  | "Poppins-Medium"
  | "Poppins-Semibold";
