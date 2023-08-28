import React, { FC } from "react";
import { Switch as CustomSwitch } from "react-native-switch";

import { colors } from "./theme";

interface SwitchProps {
  isEnabled: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Switch: FC<SwitchProps> = ({ isEnabled, onChange }) => {
  return (
    <CustomSwitch
      value={isEnabled}
      onValueChange={onChange}
      backgroundActive={colors.primary}
      backgroundInactive={colors["gray.800"]}
      renderActiveText={false}
      renderInActiveText={false}
    />
  );
};
