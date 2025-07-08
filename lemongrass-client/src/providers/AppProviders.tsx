// providers/AppProviders.tsx
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { PreloadAppData } from "./PreloadAppData";
import React from "react";

const providers = [
  (children: React.ReactNode) => (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  ),
  (children: React.ReactNode) => <AuthProvider>{children}</AuthProvider>,
  (children: React.ReactNode) => <PreloadAppData>{children}</PreloadAppData>,
];

export const AppProviders = ({ children }: { children: React.ReactNode }) =>
  providers.reduceRight((acc, Provider) => Provider(acc), children);
