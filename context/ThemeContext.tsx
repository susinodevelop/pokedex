import React from "react";
import { createContext } from "react";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider,
} from "react-native-paper";
import { useColorScheme } from "react-native";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
const ThemeContext = createContext({
  isDark: false,
  theme: LightTheme,
});

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const theme = isDark ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={theme}>
      <ThemeContext.Provider value={{ isDark, theme }}>
        {children}
      </ThemeContext.Provider>
    </PaperProvider>
  );
};
