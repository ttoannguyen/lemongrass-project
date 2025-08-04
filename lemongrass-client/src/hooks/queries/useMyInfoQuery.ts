import { accountService } from "@/services/account/account.service";
import type { Account } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useMyInfoQuery = (isLogin: boolean) => {
  return useQuery<Account>({
    queryKey: ["my-info"],
    queryFn: accountService.myInfo,
    staleTime: 5 * 60 * 1000,
    enabled: !!isLogin,
  });
};
