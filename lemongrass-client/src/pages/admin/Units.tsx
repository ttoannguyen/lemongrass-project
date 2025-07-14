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

const Units = () => {
  const { data: units = [] } = useUnitQuery();
  const addUnit = useAddUnit();
  const updateUnit = useUpdateUnit();
  const deleteUnit = useDeleteUnit();

  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [editedData, setEditedData] = useState<
    Record<string, Partial<UnitResponse>>
  >({});

  const [searchTerm, setSearchTerm] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUnit, setNewUnit] = useState({
    name: "",
    minValue: "",
    stepSize: "",
  });

  const [sortKey, setSortKey] = useState<
    "name" | "createdDate" | "lastModifiedDate"
  >("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedUnits = [...units].sort((a, b) => {
    const aValue =
      sortKey === "name" ? a.name.toLowerCase() : a.createdDate ?? "";
    const bValue =
      sortKey === "name" ? b.name.toLowerCase() : b.createdDate ?? "";

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUnits = sortedUnits.filter((unit) =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Input
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-40  rounded-none"
          />
          <select
            className="border cursor-pointer h-9 px-2 py-1 text-sm"
            value={sortKey}
            onChange={(e) =>
              setSortKey(
                e.target.value as "name" | "createdDate" | "lastModifiedDate"
              )
            }
          >
            <option value="name">Sắp xếp theo tên</option>
            <option value="createdDate">Sắp xếp theo ngày tạo</option>
            <option value="lastModifiedDate">
              Sắp xếp theo ngày chỉnh sửa
            </option>
          </select>
          <select
            className="border  cursor-pointer h-9 not-first-of-type:px-2 py-1 text-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
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
            <th className="w-48 py-2 border-r border-gray-300">Tên</th>
            <th className="w-40 py-2 border-r border-gray-300">
              Giá trị nhỏ nhất
            </th>
            <th className="w-36 py-2 border-r border-gray-300">Bước nhảy</th>
            <th className="w-36 py-2 border-r border-gray-300">Tạo bởi</th>
            <th className="w-44 py-2 border-r border-gray-300">Ngày tạo</th>
            <th className="w-36 py-2 border-r border-gray-300">Cập nhật bởi</th>
            <th className="w-44 py-2 border-r border-gray-300">
              Ngày cập nhật
            </th>
            <th className=" w-44  py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUnits.map((unit) => {
            const isEditing = editingRows[unit.id];
            const edited = editedData[unit.id] || {};
            return (
              <tr
                key={unit.id}
                className="border-t border-gray-300 text-center"
              >
                <td className="border-r border-gray-300">
                  <Input
                    className="rounded-none border-none"
                    value={edited.name ?? unit.name}
                    onChange={(e) =>
                      handleFieldChange(unit.id, "name", e.target.value)
                    }
                  />
                </td>
                <td className="border-r border-gray-300">
                  <Input
                    className="rounded-none border-none"
                    type="number"
                    min="0.01"
                    step="0.01"
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
                    className="rounded-none border-none"
                    type="number"
                    min="0.01"
                    step="0.01"
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
                      className="rounded-none w-12 h-8! my-1"
                      variant="outline"
                      onClick={() => handleDelete(unit.id)}
                    >
                      Xoá
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
