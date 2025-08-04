import * as React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAccountQuery } from "@/hooks/queries/useAccountQuery";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";
import { Skeleton } from "@/components/ui/skeleton";
import EditProfileModal from "@/components/profile/EditProfileModal";
import CustomSidebar from "@/components/profile/CustomSideBar";

const tabs = [
  { label: "Bài viết", to: "/post", tooltip: "Xem bài viết của bạn" },
  { label: "Công thức", to: "", tooltip: "Xem công thức của bạn" },
  { label: "Thông tin", to: "/info", tooltip: "Xem thông tin cá nhân" },
  { label: "Yêu thích", to: "/favorites", tooltip: "Xem mục yêu thích" },
  {
    label: "Cài đặt",
    to: "/settings",
    tooltip: "Cài đặt tài khoản",
    restricted: true,
  },
];

const AccountLayout = () => {
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

  const [openEdit, setOpenEdit] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);

  const account = fetchedUser;

  const handleFollow = () => {
    setIsFollowing(true);
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
  };

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
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen z-10 hidden lg:block">
        <CustomSidebar
          account={account}
          isMe={isMe}
          accountId={accountId}
          tabs={tabs}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
          onEdit={() => setOpenEdit(true)}
          // stats={stats}
        />
      </div>
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
