import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";

const AdminHeader = () => {
  const { account, logout: clearContext } = useAuth();
  const navigate = useNavigate();

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
      <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
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
