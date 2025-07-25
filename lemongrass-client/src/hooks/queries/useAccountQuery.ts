import { accountService } from "@/services/account/account.service";
import type { Account } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAccountQuery = (id: string) => {
  return useQuery<Account>({
    queryKey: ["account", id],
    queryFn: ({ queryKey }) => {
      const [, accountId] = queryKey;
      return accountService.getAccountById(accountId as string);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
