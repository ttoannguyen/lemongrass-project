import type { PermissionResponse } from "@/types/roles/PermissionResponse";

type Props = {
  selected: string[];
  availablePermissions: PermissionResponse[];
  onChange: (perms: string[]) => void;
};

const PermissionSelector = ({
  selected,
  availablePermissions,
  onChange,
}: Props) => {
  const togglePermission = (permName: string) => {
    if (selected.includes(permName)) {
      onChange(selected.filter((p) => p !== permName));
    } else {
      onChange([...selected, permName]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2">
      {availablePermissions.map((perm) => (
        <label
          key={perm.name}
          className="flex items-center space-x-2 text-sm cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(perm.name)}
            onChange={() => togglePermission(perm.name)}
            className="accent-primary"
          />
          <span>{perm.name}</span>
        </label>
      ))}
    </div>
  );
};

export default PermissionSelector;
