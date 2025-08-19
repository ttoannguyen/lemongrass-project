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


export const useAllAccountsQuery = () => {
  return useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: accountService.getAccounts,

    staleTime: 5 * 60 * 1000,
  });
};

export const useAccountByUsername = (username: string) => {
  return useQuery<Account>({
    queryKey: ["account", username],
    queryFn: ({ queryKey }) => {
      const [, username] = queryKey;
      return accountService.getAccountByUsername(username as string);
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });
};

