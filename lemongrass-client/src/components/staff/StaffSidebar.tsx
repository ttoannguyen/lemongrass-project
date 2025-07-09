// StaffSidebar.tsx
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Home, LogIn, LayoutDashboard, FileClock, Flag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavLinkItem {
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
  requiredPermissions?: string[];
  requiredRoles?: string[];
}

interface NavSection {
  title: string;
  links: NavLinkItem[];
}

const staffNavSections: NavSection[] = [
  {
    title: "Tổng quan",
    links: [
      {
        label: "Dashboard",
        path: "/staff",
        icon: LayoutDashboard,
        end: true,
      },
    ],
  },
  {
    title: "Kiểm duyệt",
    links: [
      {
        label: "Nội dung chờ duyệt",
        path: "/staff/pending",
        icon: FileClock,
        requiredPermissions: ["moderate_content"],
      },
      {
        label: "Báo cáo vi phạm",
        path: "/staff/reports",
        icon: Flag,
        requiredPermissions: ["moderate_content"],
      },
    ],
  },
];

const SidebarSection = ({ section }: { section: NavSection }) => {
  const { hasPermission = () => false, hasRole = () => false } = useAuth();

  const visibleLinks = section.links.filter(
    (link) =>
      (!link.requiredPermissions ||
        link.requiredPermissions.every(hasPermission)) &&
      (!link.requiredRoles || link.requiredRoles.every(hasRole))
  );

  if (visibleLinks.length === 0) return null;

  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider px-2">
        {section.title}
      </h4>
      <div className="flex flex-col gap-1">
        {visibleLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/10 text-sm",
                isActive && "bg-primary/10 text-primary font-semibold"
              )
            }
          >
            <link.icon size={16} />
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const StaffSidebar = () => {
  const { hasRole = () => false } = useAuth();

  return (
    <aside className="w-64 bg-white border-r h-full shadow-sm p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-primary">Staff Panel</h2>

      <nav className="flex flex-col gap-6 flex-1 overflow-auto">
        {staffNavSections.map((section) => (
          <SidebarSection key={section.title} section={section} />
        ))}

        {hasRole("ADMIN") && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider px-2">
              Chuyển vai trò
            </h4>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 text-sm font-medium",
                  isActive && "bg-blue-100 text-blue-700 font-semibold"
                )
              }
            >
              <LogIn size={16} />
              Vào giao diện Admin
            </NavLink>
          </div>
        )}
      </nav>

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
          <Home size={16} />
          Trang chủ
        </NavLink>
      </div>
    </aside>
  );
};

export default StaffSidebar;
