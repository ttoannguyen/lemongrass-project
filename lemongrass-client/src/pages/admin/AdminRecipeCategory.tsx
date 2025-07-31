import { useState } from "react";

import type { CategoryResponse } from "@/types/category/CategoryResponse";
import useSearchAndSort from "@/hooks/sort/useSearchAndSort";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SearchAndSortControls from "@/components/searchInput/SearchAndSortControls";
import { toast } from "sonner";
import {
  useAddCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/queries/useCategoryMutations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_TYPES = [
  { value: "CUISINE", label: "CUISINE" },
  { value: "OCCASION", label: "OCCASION" },
  { value: "MEAL_TYPE", label: "MEAL_TYPE" },
];

export default function AdminRecipeCategoryPage() {
  const { data: categories = [] } = useCategoryQuery();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const createCategory = useAddCategory();

  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [editedData, setEditedData] = useState<
    Record<string, Partial<CategoryResponse>>
  >({});

  const [dialogOpen, setDialogOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryResponse | null>(null);

  const {
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    filteredAndSortedItems: filteredCategories,
  } = useSearchAndSort(categories, {
    searchKey: "name",
    sortKeys: ["name", "type", "createdDate", "lastModifiedDate"] as const,
    initialSortKey: "name",
    initialSortOrder: "asc",
  });

  const handleFieldChange = (id: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], name: value },
    }));
    setEditingRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleSaveRow = (id: string) => {
    const edited = editedData[id];
    const original = categories.find((c) => c.id === id);
    if (!original || !edited) return;

    const name = edited.name?.trim() ?? original.name;
    const type = edited.type ?? original.type;

    if (!name) return toast.error("Tên không được để trống");

    updateCategory.mutate(
      { id, name, type },
      {
        onSuccess: () => {
          toast.success("Đã cập nhật danh mục");
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

  const handleTypeChange = (type: string, id: string) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], type },
    }));
    setEditingRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleCancelEdit = (id: string) => {
    setEditedData((prev) => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
    setEditingRows((prev) => ({ ...prev, [id]: false }));
  };

  // const openEditDialog = (category: CategoryResponse) => {
  //   setEditingCategory(category);
  //   setNameInput(category.name);
  //   setDialogOpen(true);
  // };

  const openDeleteDialog = (category: CategoryResponse) => {
    setCategoryToDelete(category);
  };

  const handleDelete = () => {
    if (!categoryToDelete) return;
    deleteCategory.mutate(categoryToDelete.id, {
      onSuccess: () => {
        toast.success("Đã xoá danh mục");
        setCategoryToDelete(null);
      },
      onError: () => toast.error("Xoá thất bại"),
    });
  };

  const handleSave = () => {
    const name = nameInput.trim();
    const type = typeInput.trim();
    if (!name) return toast.error("Tên không được để trống");

    if (editingCategory) {
      updateCategory.mutate(
        { id: editingCategory.id, name, type },
        {
          onSuccess: () => {
            toast.success("Đã cập nhật");
            setDialogOpen(false);
            setEditingCategory(null);
            setNameInput("");
          },
          onError: () => toast.error("Lỗi khi lưu"),
        }
      );
    } else {
      createCategory.mutate(
        { name, type },
        {
          onSuccess: () => {
            toast.success("Đã thêm mới");
            setDialogOpen(false);
            setNameInput("");
          },
          onError: () => toast.error("Lỗi khi lưu"),
        }
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý Danh muc</h1>

        <div className="flex gap-2">
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
            onClick={() => setDialogOpen(true)}
          >
            Thêm danh mục
          </Button>
        </div>
      </div>

      {/* <div className="border rounded"> */}
      <table className="min-w-full border border-gray-300 text-sm table-auto">
        <thead className="bg-gray-100 text-center border-b border-gray-300">
          <tr>
            <th className="w-48 py-2 border-r border-gray-300">Tên danh mục</th>
            <th className="w-48 py-2 border-r border-gray-300">Thể loại</th>
            <th className="w-36 py-2 border-r border-gray-300">Tạo bởi</th>
            <th className="w-44 py-2 border-r border-gray-300">Ngày tạo</th>
            <th className="w-36 py-2 border-r border-gray-300">Cập nhật bởi</th>
            <th className="w-44 py-2 border-r border-gray-300">
              Ngày cập nhật
            </th>
            <th className=" w-44 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((cat) => {
            const isEditing = editingRows[cat.id];
            const edited = editedData[cat.id] || {};
            return (
              <tr key={cat.id} className="border-t border-gray-300 text-center">
                <td className="border-r border-gray-300">
                  <Input
                    className="rounded-none border-none h-10"
                    value={edited.name ?? cat.name}
                    onChange={(e) => handleFieldChange(cat.id, e.target.value)}
                  />
                </td>
                <td className="border-r border-gray-300">
                  <Select
                    value={edited.type ?? cat.type}
                    onValueChange={(v) => handleTypeChange(v, cat.id)}
                  >
                    <SelectTrigger className="w-full border-none! ring-0!">
                      <SelectValue placeholder="Chọn loại danh mục" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none! rounded-none!">
                      {CATEGORY_TYPES.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                          className="focus:bg-[#e6f7f1]! rounded-none! "
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="border-r border-gray-300">
                  {cat.createdBy ?? "-"}
                </td>
                <td className="border-r border-gray-300">
                  {cat.createdDate
                    ? new Date(cat.createdDate).toLocaleString("vi-VN")
                    : "-"}
                </td>
                <td className="border-r border-gray-300">
                  {cat.lastModifiedBy ?? "-"}
                </td>
                <td className="border-r border-gray-300">
                  {cat.lastModifiedDate
                    ? new Date(cat.lastModifiedDate).toLocaleString("vi-VN")
                    : "-"}
                </td>
                <td className="flex my-auto justify-center items-center gap-1">
                  {isEditing ? (
                    <div className="max-w-40 h-10 my-auto flex justify-center items-center gap-1">
                      <>
                        <Button
                          className="rounded-none w-12 h-8! my-1 cursor-pointer"
                          disabled={updateCategory.isPending}
                          onClick={() => handleSaveRow(cat.id)}
                          size="sm"
                        >
                          Lưu
                        </Button>
                        <Button
                          className="rounded-none w-12 h-8! my-1 cursor-pointer"
                          variant="outline"
                          onClick={() => handleCancelEdit(cat.id)}
                          size="sm"
                        >
                          Hủy
                        </Button>
                      </>
                    </div>
                  ) : (
                    <>
                      <Button
                        className="rounded-none w-12 h-8! my-1 hover:bg-red-200 cursor-pointer hover:text-red-500"
                        variant="outline"
                        onClick={() => openDeleteDialog(cat)}
                      >
                        Xóa
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* </div> */}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
            </DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Tên danh mục"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />

          {/* <Input
            placeholder="Tên thể loại"
            value={typeInput}
            onChange={(e) => setTypeInput(e.target.value)}
          /> */}

          <select
            className="w-full border rounded px-2 py-2 mt-2 text-sm"
            value={typeInput}
            onChange={(e) => setTypeInput(e.target.value)}
          >
            <option value="">-- Chọn thể loại --</option>
            {CATEGORY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              onClick={handleSave}
              disabled={createCategory.isPending || updateCategory.isPending}
            >
              {editingCategory ? "Lưu" : "Thêm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!categoryToDelete}
        onOpenChange={(v) => v || setCategoryToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn muốn xoá danh mục này?</DialogTitle>
          </DialogHeader>
          <div className="text-muted-foreground">{categoryToDelete?.name}</div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteCategory.isPending}
            >
              Xoá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
