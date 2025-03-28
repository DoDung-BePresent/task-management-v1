import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

/**
 * Routes
 */
import AppRoutes from "@/routes";

/**
 * Providers
 */
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
