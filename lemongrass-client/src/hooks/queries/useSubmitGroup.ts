import { groupService } from "@/services/group/group.service";
import type { GroupCreateRequest } from "@/types/group/GroupCreateRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSubmitGroup = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: GroupCreateRequest) => {
      console.log(payload);
      return await groupService.createGroup(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", "posts"] });
    },
  });

  return mutation;
};
