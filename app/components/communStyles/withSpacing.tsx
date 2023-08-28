import React from "react";
import { ViewStyle, View } from "react-native";

interface SpacingProps {
  mt?: number; // Margin Top
  mb?: number; // Margin Bottom
  ml?: number; // Margin Left
  mr?: number; // Margin Right
}

export const withSpacing = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & SpacingProps> => {
  const ComponentWithSpacing = ({
    mt,
    mb,
    ml,
    mr,
    ...props
  }: P & SpacingProps) => {
    const style: ViewStyle = {
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    };

    return <WrappedComponent style={style} {...(props as P)} />;
  };

  ComponentWithSpacing.displayName = `withSpacing(${getDisplayName(
    WrappedComponent
  )})`;

  return ComponentWithSpacing;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDisplayName = (WrappedComponent: React.ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
