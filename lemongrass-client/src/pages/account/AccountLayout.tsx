import * as React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAccountQuery } from "@/hooks/queries/useAccountQuery";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";
import { Skeleton } from "@/components/ui/skeleton";
import EditProfileModal from "@/components/profile/EditProfileModal";
import CustomSidebar from "@/components/profile/CustomSideBar";

import {
  useFollowCountQuery,
  useFollowMutation,
  useUnfollowMutation,
  useIsFollowingQuery,
} from "@/hooks/queries/useFollowQuery";
import { FollowType } from "@/types/enums/follow.enum";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const tabs = [
  { label: "Bài viết", to: "/post", tooltip: "Xem bài viết của bạn" },
  { label: "Công thức", to: "/recipe", tooltip: "Xem công thức của bạn" },
  { label: "Thông tin", to: "/info", tooltip: "Xem thông tin cá nhân" },
  { label: "Yêu thích", to: "/favorites", tooltip: "Xem mục yêu thích" },
  { label: "Người theo dõi", to: "/follower", tooltip: "Người theo dõi" },
  { label: "Đang theo dõi", to: "/following", tooltip: "Đang theo dõi" },
  {
    label: "Cài đặt",
    to: "/settings",
    tooltip: "Cài đặt tài khoản",
    restricted: true,
  },
];

const AccountLayout = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn, account: currentAccount } = useAuth();
  const { pathname } = useLocation();
  const { accountId: rawAccountId } = useParams<{ accountId?: string }>();

  const accountId = rawAccountId ?? currentAccount?.id ?? "";
  const isMe =
    (!rawAccountId && !!currentAccount) ||
    rawAccountId === currentAccount?.id ||
    (pathname.includes("/new-recipe") && isLoggedIn);

  const { data: fetchedUser, isLoading } = useAccountQuery(accountId);
  const { data: categories } = useCategoryQuery();
  const { data: templates } = useIngredientTemplates();
  const { data: isFollowing } = useIsFollowingQuery(accountId, !isMe);
  const { data: followCount } = useFollowCountQuery(accountId);

  const [openEdit, setOpenEdit] = React.useState(false);

  const account = fetchedUser;

  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();

  const handleFollow = async () => {
    await followMutation.mutateAsync({
      targetId: accountId,
      type: FollowType.USER,
    });

    queryClient.invalidateQueries({ queryKey: ["follow-count", accountId] });
    queryClient.invalidateQueries({ queryKey: ["is-following", accountId] });
  };

  const handleUnfollow = async () => {
    await unfollowMutation.mutateAsync({
      targetId: accountId,
      type: FollowType.USER,
    });

    queryClient.invalidateQueries({ queryKey: ["follow-count", accountId] });
    queryClient.invalidateQueries({ queryKey: ["is-following", accountId] });
  };

  console.log(followCount);

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (!account || isLoading || !categories || !templates) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="w-full h-32 rounded-xl" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Link
        to={`/account/${accountId}`}
        className="fixed top-0 left-0 h-screen z-10 hidden lg:block"
      >
        <CustomSidebar
          account={account}
          isMe={isMe}
          accountId={accountId}
          tabs={tabs}
          isFollowing={isFollowing ?? false}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
          onEdit={() => setOpenEdit(true)}
          followers={
            followCount?.followerCount !== undefined
              ? followCount.followerCount
              : 0
          }
          following={
            followCount?.followingCount !== undefined
              ? followCount.followingCount
              : 0
          }
        />
      </Link>
      <main className="flex-1 px-4 pt-10 max-w-5xl bg-background ml-auto">
        <div className="w-full">
          <Outlet context={{ isMe, account, categories, templates }} />
        </div>
      </main>

      {isMe && (
        <EditProfileModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          account={account}
        />
      )}
    </div>
  );
};

export default AccountLayout;
