import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RolePermission } from "@/types";
import { toast } from "sonner";

// 🧩 Import các hook gọi API
import {
  useAddPermission,
  //   useUpdatePermission,
} from "@/hooks/queries/usePermissionMutations";

interface PermissionFormProps {
  permission?: RolePermission | null;
  onSuccess: () => void;
}

const PermissionForm = ({ permission, onSuccess }: PermissionFormProps) => {
  const [name, setName] = useState(permission?.name || "");
  const [description, setDescription] = useState(permission?.description || "");

  const isEdit = !!permission;

  const createMutation = useAddPermission();
  //   const updateMutation = useUpdatePermission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, description };

    try {
      //   if (isEdit && permission?.id) {
      //     await updateMutation.mutateAsync({ id: permission.id, ...payload });
      //     toast.success("Cập nhật quyền hạn thành công!");
      //   } else {
      await createMutation.mutateAsync(payload);
      toast.success("Tạo mới quyền hạn thành công!");
      //   }
      onSuccess();
    } catch (err) {
      toast.error("Đã xảy ra lỗi: " + err || "Không rõ nguyên nhân");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Tên quyền hạn</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isEdit}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={createMutation.isPending}>
          {/* {isEdit ? "Cập nhật" :  */}
          "Tạo mới"
          {/* } */}
        </Button>
      </div>
    </form>
  );
};

export default PermissionForm;
