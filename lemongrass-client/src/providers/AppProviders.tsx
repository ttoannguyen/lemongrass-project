import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { PreloadPublicData } from "@/providers/PreloadPublicData";
import { PreloadUserData } from "@/providers/PreloadUserData";
import { PreloadAdminData } from "@/providers/PreloadAdminData";
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
    </>
  );
};
