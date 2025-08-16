// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import PermissionSelector from "./PermissionSelector";
// import { usePermissionQuery } from "@/hooks/queries/usePermissionQuery";
// import type { RoleRequest } from "@/types/roles/RoleRequest";
// import { useAddRole, useUpdateRole } from "@/hooks/queries/useRoleMutation";

// const RoleForm = ({
//   role,
//   onClose,
// }: {
//   role: RoleRequest | null;
//   onClose: () => void;
// }) => {
//   const [name, setName] = useState(role?.name || "");
//   const [description, setDescription] = useState(role?.description || "");
//   const [permissions, setPermissions] = useState<string[]>(
//     role?.permissions || []
//   );

//   const createMutation = useAddRole();
//   const updateMutation = useUpdateRole();

//   const { data: allPermissions = [] } = usePermissionQuery();

//   const handleSubmit = async () => {
//     const query: RoleRequest = {
//       name: name.trim(),
//       description: description.trim(),
//       permissions,
//     };

//     await createMutation.mutateAsync(query);
//     console.log("Simple role:", query);
//     onClose();
//   };

//   return (
//     <div className="text-sm space-y-4">
//       <h2 className="text-base font-semibold">
//         {role ? "Sửa vai trò" : "Tạo vai trò mới"}
//       </h2>

//       <Input
//         placeholder="Tên vai trò (VD: REGISTERED)"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <Input
//         placeholder="Mô tả vai trò (VD: User normal)"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <PermissionSelector
//         selected={permissions}
//         onChange={setPermissions}
//         availablePermissions={allPermissions}
//       />

//       <div className="text-right">
//         <Button
//           onClick={handleSubmit}
//           disabled={!name.trim() || permissions.length === 0}
//         >
//           {role ? "Lưu thay đổi" : "Tạo mới"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RoleForm;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionSelector from "./PermissionSelector";
// import { usePermissionQuery } from "@/hooks/queries/usePermissionQuery";
import type { RoleRequest } from "@/types/roles/RoleRequest";
import { useAddRole, useUpdateRole } from "@/hooks/queries/useRoleMutation";

const RoleForm = ({
  role,
  onClose,
  onUpdateSuccess,
}: {
  role: RoleRequest | null;
  onClose: () => void;
  onUpdateSuccess?: (updated: RoleRequest) => void;
}) => {
  const [name, setName] = useState(role?.name || "");
  const [description, setDescription] = useState(role?.description || "");
  const [permissions, setPermissions] = useState<string[]>(
    role?.permissions || []
  );

  const createMutation = useAddRole();
  const updateMutation = useUpdateRole();

  const handleSubmit = async () => {
    const query: RoleRequest = {
      name: name.trim(),
      description: description.trim(),
      permissions,
    };

    try {
      if (role) {
        await updateMutation.mutateAsync(query);
        onUpdateSuccess?.(query);
      } else {
        await createMutation.mutateAsync(query);
      }

      console.log("Role data:", query);
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu vai trò:", error);
    }
  };

  return (
    <div className="text-sm space-y-4 text-headline bg-background">
      {/* <h2 className="text-base font-semibold">
        {role ? "Sửa vai trò" : "Tạo vai trò mới"}
      </h2> */}

      <Input
        placeholder="Tên vai trò (VD: REGISTERED)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!role}
      />

      <Input
        placeholder="Mô tả vai trò (VD: Người dùng bình thường)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <label className="font-medium mb-1 block">Quyền hạn</label>
        <PermissionSelector
          selectedPermissionNames={permissions}
          onChange={setPermissions}
        />
      </div>

      <div className="text-right">
        <Button
          onClick={handleSubmit}
          disabled={!name.trim() || permissions.length === 0}
        >
          {role ? "Lưu thay đổi" : "Tạo mới"}
        </Button>
      </div>
    </div>
  );
};

export default RoleForm;

