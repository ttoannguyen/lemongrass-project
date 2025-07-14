"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/queries/useCategoryMutations";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import type { CategoryResponse } from "@/types/category/CategoryResponse";

const RecipeCategory = () => {
  const { data: categories = [], isLoading } = useCategoryQuery();
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);
  const [nameInput, setNameInput] = useState<string>("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryResponse | null>(null);

  const openAddDialog = () => {
    setEditingCategory(null);
    setNameInput("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: CategoryResponse) => {
    setEditingCategory(category);
    setNameInput(category.name);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (category: CategoryResponse) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (!nameInput.trim()) {
      toast.error("Tên không được để trống");
      return;
    }
    console.log(nameInput);
    if (editingCategory) {
      updateCategory.mutate(
        { id: editingCategory.id, name: nameInput },
        {
          onSuccess: () => {
            toast.success("Đã cập nhật danh mục");
            setIsDialogOpen(false);
          },
          onError: () => {
            toast.error(`Cập nhật thất bại `);
          },
        }
      );
    } else {
      addCategory.mutate(nameInput, {
        onSuccess: () => {
          toast.success("Đã thêm danh mục mới");
          setIsDialogOpen(false);
        },
        onError: () => toast.error(`Thêm danh mục ${nameInput} thất bại `),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;
    deleteCategory.mutate(categoryToDelete.id, {
      onSuccess: () => {
        toast.success("Đã xoá danh mục");
        setDeleteDialogOpen(false);
      },
      onError: () => toast.error("Xoá thất bại"),
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý danh mục công thức</h1>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2" size={16} />
          Thêm danh mục
        </Button>
      </div>

      {isLoading ? (
        <p>Đang tải...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">Chưa có danh mục nào.</p>
      ) : (
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow-sm border"
            >
              <span className="font-medium">{category.name}</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(category)}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => openDeleteDialog(category)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault(); // tránh reload trang
              handleSave();
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-center mb-4">
                {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
              <Label htmlFor="name">Tên danh mục</Label>
              <Input
                id="name"
                placeholder="Nhập tên danh mục"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Hủy
                </Button>
              </DialogClose>
              <Button type="submit">
                {editingCategory ? "Cập nhật" : "Thêm mới"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xoá</DialogTitle>
          </DialogHeader>
          <p>
            Bạn có chắc muốn xoá danh mục "
            <strong>{categoryToDelete?.name}</strong>"?
          </p>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteCategory.isPending}
            >
              Xoá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeCategory;
