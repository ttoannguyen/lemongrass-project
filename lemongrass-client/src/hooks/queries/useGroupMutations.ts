import { groupService } from "@/services/group/group.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useJoinGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: string) => groupService.joinGroup(groupId),
    onSuccess: (_data, groupId) => {
      queryClient.invalidateQueries({ queryKey: ["check-join", groupId] });
      queryClient.invalidateQueries({ queryKey: ["my-groups"] });
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
};

export const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: string) => groupService.leaveGroup(groupId),
    onSuccess: (_data, groupId) => {
      queryClient.invalidateQueries({ queryKey: ["check-join", groupId] });
      queryClient.invalidateQueries({ queryKey: ["my-groups"] });
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
};
