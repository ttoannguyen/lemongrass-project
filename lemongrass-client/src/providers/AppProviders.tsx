import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { PreloadPublicData } from "@/providers/PreloadPublicData";
import { PreloadUserData } from "@/providers/PreloadUserData";
import { PreloadAdminData } from "@/providers/PreloadAdminData";
import { Toaster } from "@/components/ui/sonner";
import { WebSocketProvider } from "./WebSocketProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const providers = [
  (children: React.ReactNode) => (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  ),
  (children: React.ReactNode) => <AuthProvider>{children}</AuthProvider>,
  (children: React.ReactNode) => (
    <PreloadPublicData>{children}</PreloadPublicData>
  ),
  (children: React.ReactNode) => <PreloadUserData>{children}</PreloadUserData>,
  (children: React.ReactNode) => (
    <PreloadAdminData>{children}</PreloadAdminData>
  ),
  (children: React.ReactNode) => (
    <WebSocketProvider>{children}</WebSocketProvider>
  ),

  (children: React.ReactNode) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  ),
];

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const wrapped = providers.reduceRight(
    (acc, Provider) => Provider(acc),
    children
  );

  return (
    <>
      {wrapped}
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-right" richColors />
    </>
  );
};
