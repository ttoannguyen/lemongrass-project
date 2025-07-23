import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { useAccountQuery } from "@/hooks/queries/useAccountQuery";
import HeaderProfile from "@/components/Profile/HeaderProfile";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";

const AccountLayout = () => {
  const { isLoggedIn, account: currentAccount } = useAuth();
  const { pathname } = useLocation();
  const { accountId: rawAccountId } = useParams<{ accountId?: string }>();

  const accountId = rawAccountId ?? currentAccount?.id ?? ""; // fallback an toàn

  const isMe =
    (!rawAccountId && !!currentAccount) ||
    rawAccountId === currentAccount?.id ||
    (pathname.includes("/new-recipe") && isLoggedIn);

  // ✅ Gọi hook luôn luôn, nhưng để query tự kiểm soát việc fetch
  const { data: fetchedUser, isLoading } = useAccountQuery(accountId);

  const { data: categories } = useCategoryQuery();
  const { data: templates } = useIngredientTemplates();

  const account = fetchedUser;

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (!account || isLoading || !categories || !templates) {
    return <div className="p-4">Đang tải hồ sơ...</div>;
  }

  return (
    <div className="">
      {/* <NavBar /> */}
      <HeaderProfile account={account} />
      <div className="">
        <main className="flex-1 overflow-auto">
          <Outlet context={{ isMe, account, categories, templates }} />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
