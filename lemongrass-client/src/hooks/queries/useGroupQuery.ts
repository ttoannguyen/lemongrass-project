import { useAuth } from "@/contexts/AuthContext";
import { groupService } from "@/services/group/group.service";
import type { GroupResponse } from "@/types/group/GroupResponse";
import { useQuery } from "@tanstack/react-query";

export const useMyGroupQuery = () => {
  const { isLoggedIn } = useAuth();
  return useQuery<GroupResponse[]>({
    queryKey: ["my-groups"],
    queryFn: groupService.getMyGroup,
    staleTime: 5 * 60 * 1000,
    enabled: !!isLoggedIn,
  });
};

export const useGroupIdQuery = (id: string) => {
  const { isLoggedIn } = useAuth();
  return useQuery<GroupResponse>({
    queryKey: ["group", id],
    queryFn: () => groupService.getGroupById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id && isLoggedIn,
  });
};

export const useCheckJoinGroup = (id: string) => {
  const { isLoggedIn } = useAuth();
  return useQuery<boolean>({
    queryKey: ["check-join", id],
    queryFn: () => groupService.checkJoin(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id && isLoggedIn,
  });
};
