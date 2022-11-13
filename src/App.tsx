import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, RequireAuth } from "./auth/auth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
            </Routes>
          </QueryClientProvider>
        </AuthProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}
  