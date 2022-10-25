import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { createEmotionCache, MantineProvider, Text } from "@mantine/core";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, RequireAuth, useAuth } from "./auth/auth";
import MyHeader from "./pages/HomePage";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
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
      </AuthProvider>
    </MantineProvider>
  );
}
