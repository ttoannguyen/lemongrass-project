"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import type { UnitResponse } from "@/types/units/UnitResponse";
import { useUnitQuery } from "@/hooks/queries/useUnitQuery";
import {
  useAddUnit,
  useDeleteUnit,
  useUpdateUnit,
} from "@/hooks/queries/useUnitMutations";
import SearchAndSortControls from "@/components/searchInput/SearchAndSortControls";
import useSearchAndSort from "@/hooks/sort/useSearchAndSort";

const Units = () => {
  const { data: units = [] } = useUnitQuery();
  const addUnit = useAddUnit();
  const updateUnit = useUpdateUnit();
  const deleteUnit = useDeleteUnit();

  const {
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    filteredAndSortedItems: filteredUnits,
  } = useSearchAndSort(units, {
    searchKey: "name",
    sortKeys: ["name", "createdDate", "lastModifiedDate"],
    initialSortKey: "name",
    initialSortOrder: "asc",
  });

  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [editedData, setEditedData] = useState<
    Record<string, Partial<UnitResponse>>
  >({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUnit, setNewUnit] = useState({
    name: "",
    minValue: "",
    stepSize: "",
  });

  const handleFieldChange = (
    id: string,
    field: keyof UnitResponse,
    value: string
  ) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === "name" ? value : parseFloat(value),
      },
    }));
    setEditingRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleSaveRow = (id: string) => {
    const edited = editedData[id];
    const original = units.find((u) => u.id === id);
    if (!original || !edited) return;

    const name = edited.name ?? original.name;
    const minValue = edited.minValue ?? original.minValue;
    const stepSize = edited.stepSize ?? original.stepSize;

    if (!name.trim()) return toast.error("Tên không được để trống");
    if (minValue <= 0) return toast.error("Giá trị nhỏ nhất phải lớn hơn 0");
    if (stepSize <= 0) return toast.error("Bước nhảy phải lớn hơn 0");

    updateUnit.mutate(
      { id, name, minValue, stepSize },
      {
        onSuccess: () => {
          toast.success("Đã cập nhật đơn vị");
          setEditingRows((prev) => ({ ...prev, [id]: false }));
          setEditedData((prev) => {
            const newData = { ...prev };
            delete newData[id];
            return newData;
          });
        },
        onError: () => toast.error("Cập nhật thất bại"),
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá đơn vị này?")) return;
    deleteUnit.mutate(id, {
      onSuccess: () => toast.success("Xoá thành công"),
      onError: () => toast.error("Xoá thất bại"),
    });
  };

  const handleCancelEdit = (id: string) => {
    setEditedData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
    setEditingRows((prev) => ({ ...prev, [id]: false }));
  };

  const handleAddUnit = () => {
    const { name, minValue, stepSize } = newUnit;
    const parsedMin = parseFloat(minValue);
    const parsedStep = parseFloat(stepSize);

    if (!name.trim()) return toast.error("Tên không được để trống");
    if (isNaN(parsedMin) || parsedMin <= 0)
      return toast.error("Giá trị nhỏ nhất phải lớn hơn 0");
    if (isNaN(parsedStep) || parsedStep <= 0)
      return toast.error("Bước nhảy phải lớn hơn 0");

    if (units.some((u) => u.name.toLowerCase() === name.trim().toLowerCase())) {
      return toast.error("Đơn vị đã tồn tại");
    }

    addUnit.mutate(
      { name: name.trim(), minValue: parsedMin, stepSize: parsedStep },
      {
        onSuccess: () => {
          toast.success("Đã thêm đơn vị");
          setIsDialogOpen(false);
          setNewUnit({ name: "", minValue: "", stepSize: "" });
        },
        onError: () => toast.error("Thêm đơn vị thất bại"),
      }
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý đơn vị</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <SearchAndSortControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <Button
            className="rounded-none cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            Thêm đơn vị
          </Button>
        </div>
      </div>

      <table className="min-w-full border border-gray-300 text-sm table-auto">
        <thead className="bg-gray-100 text-center border-b border-gray-300">
          <tr>
            <th className="w-40 py-2 border-r border-gray-300">Tên</th>
            <th className="w-38 py-2 border-r border-gray-300">
              Giá trị nhỏ nhất
            </th>
            <th className="w-30 py-2 border-r border-gray-300">Bước nhảy</th>
            <th className="w-30 py-2 border-r border-gray-300">Tạo bởi</th>
            <th className="w-44 py-2 border-r border-gray-300">Ngày tạo</th>
            <th className="w-32 py-2 border-r border-gray-300">Cập nhật bởi</th>
            <th className="w-44 py-2 border-r border-gray-300">
              Ngày cập nhật
            </th>
            <th className=" w-48! py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUnits.map((unit: UnitResponse) => {
            const isEditing = editingRows[unit.id];
            const edited = editedData[unit.id] || {};
            return (
              <tr
                key={unit.id}
                className="border-t border-gray-300 text-center"
              >
                <td className="border-r border-gray-300">
                  <Input
                    className="rounded-none border-none h-10"
                    value={edited.name ?? unit.name}
                    onChange={(e) =>
                      handleFieldChange(unit.id, "name", e.target.value)
                    }
                  />
                </td>
                <td className="border-r border-gray-300">
                  <Input
                    className="rounded-none border-none h-10"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={
                      edited.minValue?.toString() ?? unit.minValue.toString()
                    }
                    onChange={(e) =>
                      handleFieldChange(unit.id, "minValue", e.target.value)
                    }
                  />
                </td>
                <td className="border-r border-gray-300">
                  <Input
                    className="rounded-none border-none h-10"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={
                      edited.stepSize?.toString() ?? unit.stepSize.toString()
                    }
                    onChange={(e) =>
                      handleFieldChange(unit.id, "stepSize", e.target.value)
                    }
                  />
                </td>
                <td className="border-r border-gray-300">
                  {unit.createdBy ?? "-"}
                </td>
                <td className="border-r border-gray-300">
                  {unit.createdDate
                    ? new Date(unit.createdDate).toLocaleString("vi-VN")
                    : "-"}
                </td>
                <td className="border-r border-gray-300">
                  {unit.lastModifiedBy ?? "-"}
                </td>
                <td className="border-r border-gray-300">
                  {unit.lastModifiedDate
                    ? new Date(unit.lastModifiedDate).toLocaleString("vi-VN")
                    : "-"}
                </td>
                <td className="flex my-auto justify-center items-center gap-1">
                  {isEditing ? (
                    <div className="max-w-40 h-10 my-auto flex justify-center items-center gap-1">
                      <>
                        <Button
                          className="rounded-none w-12 h-8! my-1"
                          onClick={() => handleSaveRow(unit.id)}
                          disabled={updateUnit.isPending}
                        >
                          Lưu
                        </Button>
                        <Button
                          className="rounded-none w-12 h-8! my-1"
                          variant="outline"
                          onClick={() => handleCancelEdit(unit.id)}
                          disabled={updateUnit.isPending}
                        >
                          Hủy
                        </Button>
                      </>
                    </div>
                  ) : (
                    // </div>
                    // <div className="w-40">
                    <Button
                      className="rounded-none w-12 h-8! my-1 hover:bg-red-200 cursor-pointer hover:text-red-500"
                      variant="outline"
                      onClick={() => handleDelete(unit.id)}
                    >
                      Xóa
                    </Button>
                    // </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Thêm đơn vị: Popup dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm đơn vị</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Tên đơn vị"
              value={newUnit.name}
              onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
            />
            <Input
              placeholder="Giá trị nhỏ nhất"
              type="number"
              value={newUnit.minValue}
              min="0.01"
              step="0.01"
              onChange={(e) =>
                setNewUnit({ ...newUnit, minValue: e.target.value })
              }
            />
            <Input
              placeholder="Bước nhảy"
              type="number"
              value={newUnit.stepSize}
              min="0.01"
              step="0.01"
              onChange={(e) =>
                setNewUnit({ ...newUnit, stepSize: e.target.value })
              }
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button onClick={handleAddUnit} disabled={addUnit.isPending}>
              Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Units;
