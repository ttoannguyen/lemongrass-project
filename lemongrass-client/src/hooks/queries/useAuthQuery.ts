// hooks/useAuthQuery.ts
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authService.introspect(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
