// PermissionList.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { RolePermission } from "@/types";
import { usePermissionQuery } from "@/hooks/queries/usePermissionQuery";
// import PermissionForm from "./PermissionForm";s

const PermissionList = () => {
  const { data: permissions = [], isLoading, isError } = usePermissionQuery();
  const [selectedPermission, setSelectedPermission] =
    useState<RolePermission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (permission: RolePermission) => {
    setSelectedPermission(permission);
  };

  const handleCreateNew = () => {
    setSelectedPermission(null);
    setIsModalOpen(true);
  };

  if (isLoading) return <p className="p-4">Đang tải quyền hạn...</p>;
  if (isError)
    return <p className="text-red-500">Không thể tải danh sách quyền hạn.</p>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-1 overflow-hidden border-y divide-x">
        {/* Sidebar - Permission List */}
        <div className="w-64 bg-gray-50 overflow-y-auto text-sm">
          <div className="p-3 border-b flex justify-between items-center">
            <span className="font-semibold">Quyền hạn</span>
            <Button size="sm" onClick={handleCreateNew}>
              +
            </Button>
          </div>
          {permissions.map((p) => (
            <div
              key={p.name}
              onClick={() => handleSelect(p)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 border-b select-none ${
                selectedPermission?.name === p.name
                  ? "bg-gray-100 font-medium"
                  : ""
              }`}
            >
              {p.name}
            </div>
          ))}
        </div>

        {/* Detail View */}
        <div className="flex-1 overflow-y-auto text-sm">
          {selectedPermission ? (
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="font-semibold text-base">
                  Quyền hạn: {selectedPermission.name}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  Sửa
                </Button>
              </div>

              <p className="text-muted-foreground">
                {selectedPermission.description}
              </p>

              <div>
                <p className="font-medium mb-1">Người tạo / cập nhật:</p>
                <p className="text-muted-foreground text-sm">
                  {selectedPermission.createdBy} (
                  {new Date(selectedPermission.createdDate).toLocaleString()})
                </p>
                <p className="text-muted-foreground text-sm">
                  {selectedPermission.lastModifiedBy} (
                  {new Date(
                    selectedPermission.lastModifiedDate
                  ).toLocaleString()}
                  )
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 text-muted-foreground">
              Chọn một quyền hạn để xem chi tiết
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl w-full">
          {/* <PermissionForm
            permission={selectedPermission}
            onSuccess={handleSave}
          /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionList;
