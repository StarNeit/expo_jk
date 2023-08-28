import React, { FC } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StatusBarStyle } from "expo-status-bar";

import { colors } from "~components/theme";

interface LayoutProps {
  statusStyle: StatusBarStyle;
  children: React.ReactNode;
  scrollView?: boolean;
  withoutSafeArea?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  statusStyle,
  withoutSafeArea,
  scrollView,
  children,
}) => {
  if (scrollView) {
    return (
      <>
        {withoutSafeArea ? (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <StatusBar style={statusStyle} />
            {children}
          </ScrollView>
        ) : (
          <SafeAreaView style={styles.container}>
            <StatusBar style={statusStyle} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.padding, styles.container]}>{children}</View>
            </ScrollView>
          </SafeAreaView>
        )}
      </>
    );
  }
  return (
    <>
      {withoutSafeArea ? (
        <View style={styles.container}>
          <StatusBar style={statusStyle} />
          {children}
        </View>
      ) : (
        <SafeAreaView style={[styles.container, styles.padding]}>
          <StatusBar style={statusStyle} />
          {children}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors["gray.900"],
  },
  container: {
    flex: 1,
    backgroundColor: colors["gray.900"],
  },
  padding: {
    paddingHorizontal: 16,
  },
});
