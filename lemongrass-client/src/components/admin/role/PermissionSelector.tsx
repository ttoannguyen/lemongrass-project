"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { CircleX } from "lucide-react";
import { usePermissionQuery } from "@/hooks/queries/usePermissionQuery";

type PermissionSelectorProps = {
  selectedPermissionNames: string[];
  onChange: (names: string[]) => void;
};

const PermissionSelector = ({
  selectedPermissionNames,
  onChange,
}: PermissionSelectorProps) => {
  const { data: permissions = [] } = usePermissionQuery();
  const [search, setSearch] = useState("");

  const selectedPermissions = useMemo(
    () => permissions.filter((p) => selectedPermissionNames.includes(p.name)),
    [permissions, selectedPermissionNames]
  );

  const filteredPermissions = useMemo(() => {
    return permissions
      .filter((p) => !selectedPermissionNames.includes(p.name))
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [permissions, selectedPermissionNames, search]);

  const matchedSelectedPermission = useMemo(() => {
    if (!search.trim()) return null;
    return selectedPermissions.find((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [selectedPermissions, search]);

  const togglePermission = (permissionName: string) => {
    onChange([...selectedPermissionNames, permissionName]);
    setSearch("");
  };

  const removePermission = (permissionName: string) => {
    onChange(selectedPermissionNames.filter((name) => name !== permissionName));
  };

  if (permissions.length === 0) return null;

  return (
    <div className="space-y-3">
      {selectedPermissions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedPermissions.map((permission) => (
            <div
              key={permission.name}
              className="relative flex items-center  text-headline bg-background  px-3 py-1 text-sm border"
            >
              <p>{permission.name}</p>

              <button
                type="button"
                onClick={() => removePermission(permission.name)}
                className="ml-1 hover:text-tertiary transition"
              >
                <CircleX className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search input */}
      <Input
        placeholder="Tìm quyền..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Permissions list */}
      {(filteredPermissions.length > 0 ||
        matchedSelectedPermission ||
        search.trim()) && (
        <div className="max-h-48 overflow-y-auto  rounded-md p-2 flex flex-wrap gap-2">
          {filteredPermissions.length > 0 ? (
            filteredPermissions.map((permission) => (
              <button
                key={permission.name}
                type="button"
                onClick={() => togglePermission(permission.name)}
                className="px-3 py-1 text-sm rounded-full border  bg-main text-headline hover:bg-highlight cursor-pointer transition "
              >
                {permission.name}
              </button>
            ))
          ) : matchedSelectedPermission ? (
            <p className="text-sm text-green-600 italic w-full">
              Quyền "<strong>{matchedSelectedPermission.name}</strong>" đã được
              chọn.
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic w-full">
              Không tìm thấy quyền
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PermissionSelector;
