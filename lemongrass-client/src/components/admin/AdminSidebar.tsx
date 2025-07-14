import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  ChefHat,
  ShieldCheck,
  Settings,
  Repeat,
  HomeIcon,
  Apple,
  FolderKanban,
  Ruler,
  Tag,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavLinkItem {
  label: string;
  path: string;
  icon: React.ElementType;
  end?: boolean;
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

const navSections: {
  title: string;
  links: NavLinkItem[];
}[] = [
  {
    title: "Tổng quan",
    links: [
      { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    ],
  },
  {
    title: "Quản lý nội dung",
    links: [
      {
        label: "Bài viết",
        path: "/admin/posts",
        icon: FileText,
      },
      {
        label: "Công thức",
        path: "/admin/recipes",
        icon: ChefHat,
      },
      {
        label: "Danh mục công thức",
        path: "/admin/recipe-categories",
        icon: FolderKanban,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Nguyên liệu",
        path: "/admin/ingredients",
        icon: Apple,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Đơn vị đo",
        path: "/admin/units",
        icon: Ruler,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Thẻ / Tags",
        path: "/admin/tags",
        icon: Tag,
        requiredRoles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Hệ thống",
    links: [
      {
        label: "Kiểm duyệt",
        path: "/admin/moderation",
        icon: ShieldCheck,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Cài đặt",
        path: "/admin/settings",
        icon: Settings,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Vai trò & Quyền hạn",
        path: "/admin/roles",
        icon: ShieldCheck,
        requiredRoles: ["ADMIN"],
      },
    ],
  },
];

const AdminSidebar = () => {
  const { hasRole, hasPermission } = useAuth();

  const isLinkVisible = (link: NavLinkItem) => {
    const { requiredRoles, requiredPermissions } = link;

    if (requiredRoles && !requiredRoles.some(hasRole)) return false;

    if (requiredPermissions && !requiredPermissions.some(hasPermission))
      return false;

    return true;
  };

  return (
    <aside className="w-64 bg-white border-r h-full shadow-sm p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-6 flex-1 overflow-auto">
        {navSections.map((section) => {
          const visibleLinks = section.links.filter(isLinkVisible);
          if (visibleLinks.length === 0) return null;

          return (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider px-2">
                {section.title}
              </h4>
              <div className="flex flex-col gap-1">
                {visibleLinks.map(({ label, path, icon: Icon, end }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/10 text-sm font-medium",
                        isActive && "bg-primary/10 text-primary font-semibold"
                      )
                    }
                  >
                    <Icon size={16} />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}

        {hasRole("ADMIN") && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider px-2">
              Chuyển vai trò
            </h4>
            <div className="flex flex-col gap-1">
              <NavLink
                to="/staff"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 text-sm font-medium",
                    isActive && "bg-blue-100 text-blue-700 font-semibold"
                  )
                }
              >
                <Repeat size={16} />
                Sang giao diện Staff
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Nút quay lại trang chủ */}
      <div className="mt-4 pt-4 border-t">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium text-gray-700",
              isActive && "bg-gray-200 text-black font-semibold"
            )
          }
        >
          <HomeIcon size={16} />
          Về trang chủ
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
