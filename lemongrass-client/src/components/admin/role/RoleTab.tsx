// RoleList.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RoleForm from "./RoleForm";
import { useRoleQuery } from "@/hooks/queries/useRoleQuery";
import type { Role } from "@/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const RoleList = () => {
  const { data: roles = [], isLoading, isError } = useRoleQuery();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  const handleCreateNew = () => {
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleSaveRole = () => {
    setIsModalOpen(false);
    // Optional: refetch roles if needed
  };

  if (isLoading) return <p className="p-4">Đang tải vai trò...</p>;
  if (isError)
    return <p className="text-red-500">Không thể tải danh sách vai trò.</p>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-1 overflow-hidden border-y divide-x">
        {/* Sidebar - Role List */}
        <div className="w-64 bg-gray-50 overflow-y-auto text-sm">
          <div className="p-3 border-b flex justify-between items-center">
            <span className="font-semibold">Vai trò</span>
            <Button size="sm" onClick={handleCreateNew}>
              +
            </Button>
          </div>
          {roles.map((role) => (
            <div
              key={role.name}
              onClick={() => handleSelectRole(role)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 border-b select-none ${
                selectedRole?.name === role.name
                  ? "bg-gray-100 font-medium"
                  : ""
              }`}
            >
              {role.name}
            </div>
          ))}
        </div>

        {/* Detail View */}
        <div className="flex-1 overflow-y-auto text-sm">
          {selectedRole ? (
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="font-semibold text-base">
                  Vai trò: {selectedRole.name}
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
                {selectedRole.description}
              </p>

              <div>
                <p className="font-medium mb-1">Người tạo / cập nhật:</p>
                <p className="text-muted-foreground text-sm">
                  {selectedRole.createdBy} (
                  {new Date(selectedRole.createdDate).toLocaleString()})
                </p>
                <p className="text-muted-foreground text-sm">
                  {selectedRole.lastModifiedBy} (
                  {new Date(selectedRole.lastModifiedDate).toLocaleString()})
                </p>
              </div>

              <div>
                <p className="font-medium mb-1">Danh sách quyền hạn:</p>
                <ul className="list-disc ml-6 text-muted-foreground space-y-2">
                  {selectedRole.permissions.map((p) => (
                    <li key={p.name}>
                      <div>
                        <span className="font-medium">{p.name}</span> –{" "}
                        {p.description}
                      </div>
                      <div className="text-xs text-gray-500 ml-2">
                        Tạo: {p.createdBy} (
                        {new Date(p.createdDate).toLocaleDateString()}) | Sửa:{" "}
                        {p.lastModifiedBy} (
                        {new Date(p.lastModifiedDate).toLocaleDateString()})
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-4 text-muted-foreground">
              Chọn một vai trò để xem chi tiết
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl w-full">
          <RoleForm role={selectedRole} onSuccess={handleSaveRole} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleList;
