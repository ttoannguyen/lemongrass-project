import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"; // hoặc component UI bạn đang dùng
import { ScrollArea } from "@/components/ui/scroll-area"; // tùy chọn
import { useUnitQuery } from "@/hooks/queries/useUnitQuery";
// hook lấy danh sách đơn vị

type AllowedUnitsDropdownProps = {
  selectedUnitIds: string[];
  onChange: (ids: string[]) => void;
};

const AllowedUnitsDropdown = ({
  selectedUnitIds,
  onChange,
}: AllowedUnitsDropdownProps) => {
  const { data: units } = useUnitQuery(); // [{id, name}]
  const [open, setOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState<string[]>([]);

  useEffect(() => {
    setLocalSelected(selectedUnitIds);
  }, [selectedUnitIds]);

  const toggleUnit = (unitId: string) => {
    const updated = localSelected.includes(unitId)
      ? localSelected.filter((id) => id !== unitId)
      : [...localSelected, unitId];
    setLocalSelected(updated);
    onChange(updated);
  };

  if (!units) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        className="border rounded px-2 py-1 w-full text-left"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        {localSelected.length > 0
          ? `${localSelected.length} đơn vị được chọn`
          : "Chọn đơn vị"}
      </button>

      {open && (
        <div className="absolute z-10 bg-white border mt-1 rounded w-full shadow">
          <ScrollArea className="max-h-48 overflow-y-auto p-2">
            {units.map((unit) => (
              <label
                key={unit.id}
                className="flex items-center gap-2 py-1 cursor-pointer"
              >
                <Checkbox
                  checked={localSelected.includes(unit.id)}
                  onCheckedChange={() => toggleUnit(unit.id)}
                />
                {unit.name}
              </label>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default AllowedUnitsDropdown;
