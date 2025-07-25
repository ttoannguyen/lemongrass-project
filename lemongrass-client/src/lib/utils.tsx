// utils/routeWrapper.ts
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import RoleRoute from "@/components/protectedRoute/RoleRoute";
import type { Account } from "@/types";
import type { ReactNode } from "react";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export const wrapProtected = (element: ReactNode) => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

export const wrapRole = (element: ReactNode, roles: string[]) => (
  <RoleRoute requiredRoles={roles}>{element}</RoleRoute>
);

export const isAccountHasRole = (
  account: Account | null | undefined,
  roleName: string
) => {
  return account?.roles?.some((role) => role.name === roleName);
};
