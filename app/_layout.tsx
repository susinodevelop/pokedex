import React from "react";
import { Stack } from "expo-router";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
