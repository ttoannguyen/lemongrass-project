// RoleForm.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionSelector from "./PermissionSelector";
import type { Role } from "@/types";

const RoleForm = ({
  role,
  onSuccess,
}: {
  role: Role | null;
  onSuccess: (role: Role) => void;
}) => {
  const [name, setName] = useState(role?.name || "");
  const [description, setDescription] = useState(role?.description || "");
  const [permissions, setPermissions] = useState<string[]>(
    role?.permissions.map((p) => p.name) || []
  );

  const allPermissions = [
    "manage_users",
    "manage_posts",
    "manage_recipes",
    "moderate_content",
    "edit_settings",
  ];

  const handleSubmit = () => {
    const now = new Date().toISOString();
    const newRole: Role = {
      name,
      description,
      permissions: permissions.map((perm) => ({
        name: perm,
        description: perm,
        createdBy: "system",
        createdDate: now,
        lastModifiedBy: "system",
        lastModifiedDate: now,
      })),
      createdBy: role?.createdBy || "system",
      createdDate: role?.createdDate || now,
      lastModifiedBy: "system",
      lastModifiedDate: now,
    };

    onSuccess(newRole);
  };

  return (
    <div className="text-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold">
          {role ? "Sửa vai trò" : "Tạo vai trò mới"}
        </h2>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Tên vai trò (VD: ADMIN)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Mô tả vai trò"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <PermissionSelector
          selected={permissions}
          onChange={setPermissions}
          availablePermissions={allPermissions}
        />
        <div className="text-right">
          <Button onClick={handleSubmit}>
            {role ? "Lưu thay đổi" : "Tạo mới"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleForm;
