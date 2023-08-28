/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */

import React, { useState, useEffect, useRef } from "react";
import { AppState, Platform } from "react-native";
import { enableScreens } from "react-native-screens";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Logs } from 'expo';
import { useFonts } from "expo-font";
import VersionInfo from "react-native-version-info";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { AppNavigator } from "~navigators/index";

import './setupAxios';

Logs.enableExpoCliLogging()
/**
 * This is the root component of our app.
 */
export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const appState = useRef(AppState.currentState);
  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    // Add all the font files you want to use
  });

  // Kick off initial async loading actions
  useEffect(() => {
    if (Platform.OS === "ios") {
      enableScreens(false);
    }
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
    });

    (async () => {
      console.log(`App version ${VersionInfo.appVersion} is mounted.`);

      setIsAppReady(true);
    })();

    return () => {
      subscription.remove();
    };
  }, []);

  if (!isAppReady || !fontsLoaded) {
    return;
  }

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <ActionSheetProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigator />
          </GestureHandlerRootView>
        </ActionSheetProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
