// src/constants/adminNav.ts
import {
  LayoutDashboard,
  FileText,
  ChefHat,
  ShieldCheck,
  Settings,
  //   Repeat,
  Apple,
  FolderKanban,
  Ruler,
  Tag,
} from "lucide-react";

export interface NavLinkItem {
  label: string;
  path: string;
  header: string;
  icon: React.ElementType;
  end?: boolean;
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

export const navSections: {
  title: string;
  links: NavLinkItem[];
}[] = [
  {
    title: "Tổng quan",
    links: [
      {
        label: "Dashboard",
        header: "Quản lý chung",
        path: "/admin",
        icon: LayoutDashboard,
        end: true,
      },
    ],
  },
  {
    title: "Quản lý nội dung",
    links: [
      {
        label: "Bài viết",
        header: "Quản lý Bài viết",
        path: "/admin/posts",
        icon: FileText,
      },
      {
        label: "Công thức",
        header: "Quản lý Công thức",
        path: "/admin/recipes",
        icon: ChefHat,
      },
      {
        label: "Danh mục công thức",
        header: "Quản lý Danh mục công thức",
        path: "/admin/recipe-categories",
        icon: FolderKanban,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Nguyên liệu",
        header: "Quản lý Nguyên liệu",

        path: "/admin/ingredients",
        icon: Apple,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Đơn vị đo",
        header: "Quản lý Đơn vị",

        path: "/admin/units",
        icon: Ruler,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Thẻ / Tags",
        header: "Quản lý Thẻ",
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
        header: "Kiểm duyệt Nội dung",

        path: "/admin/moderation",
        icon: ShieldCheck,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Cài đặt",
        header: "Cài đặt ",

        path: "/admin/settings",
        icon: Settings,
        requiredRoles: ["ADMIN"],
      },
      {
        label: "Vai trò & Quyền hạn",
        header: "Quản lý Vai trò và Quyền hạn",

        path: "/admin/roles",
        icon: ShieldCheck,
        requiredRoles: ["ADMIN"],
      },
    ],
  },
];

// Optional: Tạo map path => label để hiển thị header tự động
export const adminRouteTitleMap: Record<string, string> = Object.fromEntries(
  navSections.flatMap((section) =>
    section.links.map((link) => [link.path, link.label])
  )
);
