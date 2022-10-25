import * as React from "react";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { createEmotionCache, MantineProvider, Text } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, RequireAuth, useAuth } from "./auth/auth";
import MyHeader from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <MyHeader />
                </RequireAuth>
              }
            />
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
