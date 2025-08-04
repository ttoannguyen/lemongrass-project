import { followService } from "@/services/account/follow.service";
import type { Follow } from "@/types/follow/Follow";
import type { FollowCount } from "@/types/follow/FollowCount";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFollowCountQuery = (id: string) => {
  return useQuery<FollowCount>({
    queryKey: ["follow-count", id],
    queryFn: () => followService.getCountFollow(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFollowMutation = () => {
  return useMutation({
    mutationFn: (payload: Follow) => followService.follow(payload),
  });
};

export const useUnfollowMutation = () => {
  return useMutation({
    mutationFn: (payload: Follow) => followService.unFollow(payload),
  });
};

export const useIsFollowingQuery = (
  targetId: string,
  enabled: boolean = true
) => {
  return useQuery<boolean>({
    queryKey: ["is-following", targetId],
    queryFn: () => followService.isFollowing(targetId),
    enabled: !!targetId && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
