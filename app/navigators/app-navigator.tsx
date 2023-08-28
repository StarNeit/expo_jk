import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OnboardingAstroScreen } from "~screens/onboarding-astro";

export type NavigatorParamList = {
  onboarding: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="onboarding" component={OnboardingAstroScreen} />
    </Stack.Navigator>
  );
};

export type NavigationProps = Partial<
  React.ComponentProps<typeof NavigationContainer>
>;

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = "AppNavigator";
