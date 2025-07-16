import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import { adminRouteTitleMap } from "@/utils/adminNavMap";

const AdminHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { account, logout: clearContext } = useAuth();
  const navigate = useNavigate();

  const pageTitle =
    adminRouteTitleMap[pathname] ||
    // hoặc khớp phần bắt đầu nếu có path động như /admin/recipes/123
    Object.entries(adminRouteTitleMap).find(([path]) =>
      pathname.startsWith(path)
    )?.[1] ||
    "Bảng điều khiển";

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("authToken");
      clearContext();
      navigate("/");
    }
  };

  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Hi, {account?.username || "Admin"}
        </span>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
