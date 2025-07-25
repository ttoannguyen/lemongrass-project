import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AvataProfile from "../profile/AvataProfile";
import ReusableDropdown from "../ReusableDropdown";
import { authService } from "@/services/auth.service";
import { isAccountHasRole } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

const AvatarNav = () => {
  const { account, logout: clearContext } = useAuth();
  const navigate = useNavigate();
  const isAdmin = isAccountHasRole(account, "ADMIN");
  const isStaff = isAccountHasRole(account, "STAFF");
  const queryClient = useQueryClient();

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
      label: "Profile",
      onClick: () => navigate(`/account/${account?.id}`),
    },
    {
      label: "My Recipe",
      onClick: () => navigate("/my-recipe"),
    },
    {
      label: "My Post",
      onClick: () => navigate("/my-post"),
    },
    {
      label: "Admin Panel",
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
      label: "Logout",
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
