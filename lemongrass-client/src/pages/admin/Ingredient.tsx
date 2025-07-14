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

import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";
import {
  useAddIngredient,
  useDeleteIngredient,
  useUpdateIngredient,
} from "@/hooks/queries/useIngredientMutationsQuery";
import AllowedUnitsDropdown from "@/components/dropdown/AllowUnitsDropdown";

const Ingredients = () => {
  const { data: ingredients = [] } = useIngredientTemplates();
  const addIngredient = useAddIngredient();
  const updateIngredient = useUpdateIngredient();
  const deleteIngredient = useDeleteIngredient();

  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [editedData, setEditedData] = useState<
    Record<
      string,
      { name?: string; aliases?: string; allowedUnitIds?: string[] }
    >
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState({ name: "", aliases: "" });

  const [sortKey, setSortKey] = useState<
    "name" | "createdDate" | "lastModifiedDate"
  >("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedIngredients = [...ingredients].sort((a, b) => {
    const aValue = sortKey === "name" ? a.name.toLowerCase() : a[sortKey] ?? "";
    const bValue = sortKey === "name" ? b.name.toLowerCase() : b[sortKey] ?? "";

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredIngredients = sortedIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFieldChange = (
    id: string,
    field: "name" | "aliases",
    value: string
  ) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
    setEditingRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleSaveRow = (id: string) => {
    const edited = editedData[id];
    const original = ingredients.find((i) => i.id === id);
    if (!original || !edited) return;

    const name = (edited.name ?? original.name).trim();
    const aliasesStr = edited.aliases ?? original.aliases.join(", ");
    const allowedUnitIds =
      edited.allowedUnitIds ?? original.allowedUnits?.map((u) => u.id) ?? [];

    if (!name) return toast.error("Tên không được để trống");

    updateIngredient.mutate(
      {
        id,
        name,
        aliases: aliasesStr
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        allowedUnitIds,
      },
      {
        onSuccess: () => {
          toast.success("Đã cập nhật nguyên liệu");
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
    if (!confirm("Bạn có chắc chắn muốn xoá nguyên liệu này?")) return;
    deleteIngredient.mutate(id, {
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

  const handleAddIngredient = () => {
    const { name, aliases } = newIngredient;

    if (!name.trim()) return toast.error("Tên không được để trống");
    if (
      ingredients.some(
        (i) => i.name.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      return toast.error("Nguyên liệu đã tồn tại");
    }

    addIngredient.mutate(
      {
        name: name.trim(),
        aliases: aliases
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        allowedUnitIds: [],
      },
      {
        onSuccess: () => {
          toast.success("Đã thêm nguyên liệu");
          setIsDialogOpen(false);
          setNewIngredient({ name: "", aliases: "" });
        },
        onError: () => toast.error("Thêm nguyên liệu thất bại"),
      }
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý nguyên liệu</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Input
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-40 rounded-none"
          />
          <select
            className="border h-9 px-2 py-1 text-sm cursor-pointer"
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
            className="border h-9 px-2 py-1 text-sm cursor-pointer"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
          <Button
            className="rounded-none"
            onClick={() => setIsDialogOpen(true)}
          >
            Thêm nguyên liệu
          </Button>
        </div>
      </div>

      <table className="min-w-full border border-gray-300 text-sm table-auto">
        <thead className="bg-gray-100 text-center border-b border-gray-300">
          <tr>
            <th className="w-38 py-2 border-r">Tên</th>
            <th className="w-36 py-2 border-r">Tên gọi khác</th>
            <th className="w-36 py-2 border-r">Đơn vị cho phép</th>
            <th className="w-20 py-2 border-r">Tạo bởi</th>
            <th className="w-36 py-2 border-r">Ngày tạo</th>
            <th className="w-28 py-2 border-r">Cập nhật bởi</th>
            <th className="w-36 py-2 border-r">Ngày cập nhật</th>
            <th className="py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredIngredients.map((ingredient) => {
            const isEditing = editingRows[ingredient.id];
            const edited = editedData[ingredient.id] || {};
            return (
              <tr
                key={ingredient.id}
                className="text-center border-t border-gray-300"
              >
                <td className="border-r">
                  {isEditing ? (
                    <Input
                      className="rounded-none border-none text-center"
                      value={edited.name ?? ingredient.name}
                      onChange={(e) =>
                        handleFieldChange(ingredient.id, "name", e.target.value)
                      }
                    />
                  ) : (
                    ingredient.name
                  )}
                </td>
                <td className="border-r">
                  {isEditing ? (
                    <Input
                      className="rounded-none border-none text-center"
                      value={edited.aliases ?? ingredient.aliases.join(", ")}
                      onChange={(e) =>
                        handleFieldChange(
                          ingredient.id,
                          "aliases",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    ingredient.aliases.join(", ")
                  )}
                </td>
                <td className="border-r text-left px-2">
                  {isEditing ? (
                    <AllowedUnitsDropdown
                      selectedUnitIds={
                        edited.allowedUnitIds ??
                        ingredient.allowedUnits?.map((u) => u.id) ??
                        []
                      }
                      onChange={(newIds) => {
                        setEditedData((prev) => ({
                          ...prev,
                          [ingredient.id]: {
                            ...prev[ingredient.id],
                            allowedUnitIds: newIds,
                          },
                        }));
                      }}
                    />
                  ) : ingredient.allowedUnits.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {ingredient.allowedUnits.map((unit) => (
                        <li key={unit.id}>{unit.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 italic">Không có</span>
                  )}
                </td>
                <td className="border-r">{ingredient.createdBy ?? "-"}</td>
                <td className="border-r">
                  {ingredient.createdDate
                    ? new Date(ingredient.createdDate).toLocaleString("vi-VN")
                    : "-"}
                </td>
                <td className="border-r">{ingredient.lastModifiedBy ?? "-"}</td>
                <td className="border-r">
                  {ingredient.lastModifiedDate
                    ? new Date(ingredient.lastModifiedDate).toLocaleString(
                        "vi-VN"
                      )
                    : "-"}
                </td>
                <td className="flex justify-center items-center gap-1 min-w-40">
                  {isEditing ? (
                    <>
                      <Button
                        className="rounded-none w-12 h-8"
                        onClick={() => handleSaveRow(ingredient.id)}
                        disabled={updateIngredient.isPending}
                      >
                        Lưu
                      </Button>
                      <Button
                        className="rounded-none w-12 h-8"
                        variant="outline"
                        onClick={() => handleCancelEdit(ingredient.id)}
                      >
                        Hủy
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="rounded-none w-12 h-8"
                        variant="outline"
                        onClick={() =>
                          setEditingRows((prev) => ({
                            ...prev,
                            [ingredient.id]: true,
                          }))
                        }
                      >
                        Sửa
                      </Button>
                      <Button
                        className="rounded-none w-12 h-8"
                        variant="destructive"
                        onClick={() => handleDelete(ingredient.id)}
                      >
                        Xoá
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Dialog thêm nguyên liệu */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm nguyên liệu</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Tên nguyên liệu"
              value={newIngredient.name}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, name: e.target.value })
              }
            />
            <Input
              placeholder="Tên gọi khác (phân cách bằng dấu phẩy)"
              value={newIngredient.aliases}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, aliases: e.target.value })
              }
            />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              onClick={handleAddIngredient}
              disabled={addIngredient.isPending}
            >
              Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ingredients;
