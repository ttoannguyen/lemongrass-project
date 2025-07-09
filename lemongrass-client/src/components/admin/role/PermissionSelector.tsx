// PermissionSelector.tsx
const PermissionSelector = ({
  selected,
  availablePermissions,
  onChange,
}: {
  selected: string[];
  availablePermissions: string[];
  onChange: (perms: string[]) => void;
}) => {
  const togglePermission = (perm: string) => {
    if (selected.includes(perm)) {
      onChange(selected.filter((p) => p !== perm));
    } else {
      onChange([...selected, perm]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {availablePermissions.map((perm) => (
        <label
          key={perm}
          className="flex items-center space-x-2 text-sm cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(perm)}
            onChange={() => togglePermission(perm)}
            className="accent-primary"
          />
          <span>{perm}</span>
        </label>
      ))}
    </div>
  );
};

export default PermissionSelector;
