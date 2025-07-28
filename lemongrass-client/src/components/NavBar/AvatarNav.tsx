import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AvataProfile from "../profile/AvataProfile";
import ReusableDropdown from "../ReusableDropdown";
import { authService } from "@/services/auth.service";
import { isAccountHasRole } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";

const AvatarNav = () => {
  const { account, logout: clearContext } = useAuth();
  const navigate = useNavigate();
  const isAdmin = isAccountHasRole(account, "ADMIN");
  const isStaff = isAccountHasRole(account, "STAFF");
  const queryClient = useQueryClient();
  const {t} = useTranslation()

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("authToken");
      clearContext();
      queryClient.clear();
      navigate("/");
    }
  };

  const items = [
    {
      label: t(TRANSLATION_KEYS.profile.title),
      onClick: () => navigate(`/account/${account?.id}`),
    },
    {
      label: t(TRANSLATION_KEYS.profile.myPost),
      onClick: () => navigate("/my-recipe"),
    },
    {
      label: t(TRANSLATION_KEYS.profile.myRecipe),
      onClick: () => navigate("/my-post"),
    },
    {
      label: t(TRANSLATION_KEYS.profile.adminPanel),
      onClick: () => navigate("/admin"),
      show: isAdmin,
      separatorBefore: true,
      className: "focus:bg-yellow-500/20 focus:text-yellow-700",
    },
    {
      label: "Staff Panel",
      onClick: () => navigate("/staff"),
      show: isStaff,
      separatorBefore: true,
      className: "focus:bg-yellow-500/20 focus:text-yellow-700",
    },
    {
      label: t(TRANSLATION_KEYS.auth.logout),
      onClick: handleLogout,
      separatorBefore: true,
      className: "focus:bg-tertiary/30 focus:text-tertiary",
    },
  ];

  return (
    <ReusableDropdown
      trigger={
        <div className="flex items-center justify-center">
          <AvataProfile account={account ?? undefined} />
        </div>
      }
      items={items}
    />
  );
};

export default AvatarNav;
