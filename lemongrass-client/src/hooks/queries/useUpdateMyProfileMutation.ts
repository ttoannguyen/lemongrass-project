// hooks/mutations/useUpdateMyProfileMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Account } from "@/types";
import { accountService } from "@/services/account/account.service";

export const useUpdateMyProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      avatar,
    }: {
      data: Partial<Omit<Account, "id" | "avatarUrl">>;
      avatar?: File | null;
    }) => {
      return await accountService.updateMyInfo(data, avatar);
    },
    onSuccess: (_data) => {
      console.log("Updated account:", _data);
      queryClient.invalidateQueries({ queryKey: ["my-info", "auth", "me"] });
      queryClient.invalidateQueries({ queryKey: ["account", _data.id] });
    },
  });
};
