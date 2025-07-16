"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useUnitQuery } from "@/hooks/queries/useUnitQuery";
import { CircleX } from "lucide-react";

type AllowedUnitsSelectorProps = {
  selectedUnitIds: string[];
  onChange: (ids: string[]) => void;
};

const AllowedUnitsSelector = ({
  selectedUnitIds,
  onChange,
}: AllowedUnitsSelectorProps) => {
  const { data: units = [] } = useUnitQuery();
  const [search, setSearch] = useState("");

  const selectedUnits = useMemo(
    () => units.filter((u) => selectedUnitIds.includes(u.id)),
    [units, selectedUnitIds]
  );

  const filteredUnits = useMemo(() => {
    return units
      .filter((u) => !selectedUnitIds.includes(u.id))
      .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
  }, [units, selectedUnitIds, search]);

  const matchedSelectedUnit = useMemo(() => {
    if (!search.trim()) return null;
    return selectedUnits.find((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [selectedUnits, search]);

  const toggleUnit = (unitId: string) => {
    onChange([...selectedUnitIds, unitId]);
  };

  const removeUnit = (unitId: string) => {
    onChange(selectedUnitIds.filter((id) => id !== unitId));
  };

  if (units.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Selected badges */}
      {selectedUnits.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedUnits.map((unit) => (
            <div
              key={unit.id}
              className="relative flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm"
            >
              {unit.name}
              <button
                type="button"
                onClick={() => removeUnit(unit.id)}
                className="ml-1 hover:text-red-500 transition"
              >
                <CircleX className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search input */}
      <Input
        placeholder="Tìm đơn vị..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Units list */}
      <div className="max-h-48 overflow-y-auto border rounded-md p-2 flex flex-wrap gap-2">
        {filteredUnits.length > 0 ? (
          filteredUnits.map((unit) => (
            <button
              key={unit.id}
              type="button"
              onClick={() => toggleUnit(unit.id)}
              className="px-3 py-1 text-sm rounded-full border bg-muted text-muted-foreground hover:bg-primary/10 transition"
            >
              {unit.name}
            </button>
          ))
        ) : matchedSelectedUnit ? (
          <p className="text-sm text-green-600 italic w-full">
            Đơn vị "<strong>{matchedSelectedUnit.name}</strong>" đã được thêm.
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic w-full">
            Không tìm thấy đơn vị
          </p>
        )}
      </div>
    </div>
  );
};

export default AllowedUnitsSelector;
