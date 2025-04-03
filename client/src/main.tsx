import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";
import "./index.css";

/**
 * Routes
 */
import AppRoutes from "@/routes";

/**
 * Providers
 */
import { QueryProvider } from "@/providers/QueryProvider";

/**
 * Components
 */
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <NuqsAdapter>
        <AppRoutes />
      </NuqsAdapter>
      <Toaster />
    </QueryProvider>
  </StrictMode>,
);
