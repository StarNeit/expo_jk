import React from "react";
import { TextStyle, View } from "react-native";

import { colors, ColorsKey } from "~components/theme";

interface ColorProps {
  color?: ColorsKey;
  bg?: ColorsKey;
}

export const withColor = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & ColorProps> => {
  const ComponentWithSpacing = ({ color, bg, ...props }: P & ColorProps) => {
    const style: TextStyle = {
      color: color ? colors[color] : "black",
      backgroundColor: bg ? colors[bg] : "transparent",
    };

    return (
      <View>
        <WrappedComponent
          color={style.color}
          bg={style.backgroundColor}
          {...(props as P)}
        />
      </View>
    );
  };

  ComponentWithSpacing.displayName = `withColor(${getDisplayName(
    WrappedComponent
  )})`;

  return ComponentWithSpacing;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDisplayName = (WrappedComponent: React.ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
