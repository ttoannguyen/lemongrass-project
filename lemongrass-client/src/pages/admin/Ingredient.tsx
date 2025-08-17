"use client";

import { useRef, useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { toast } from "sonner";

import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";
import {
  useAddIngredient,
  useUpdateIngredient,
} from "@/hooks/queries/useIngredientMutationsQuery";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import AllowedUnitsSelector from "@/components/dropdown/AllowUnitsDropdown";
import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
import { Label } from "@/components/ui/label";
import extractErrorMessage from "@/utils/extractErrorMessage";
import SearchAndSortControls from "@/components/searchInput/SearchAndSortControls";
import useSearchAndSort from "@/hooks/sort/useSearchAndSort";
import { useImportFileExcelMutation } from "@/hooks/queries/useImportFile";

type SortableIngredientKey = "name" | "createdDate" | "lastModifiedDate";

const Ingredients = () => {
  const { data: ingredients = [] } = useIngredientTemplates();
  const addIngredient = useAddIngredient();
  const updateIngredient = useUpdateIngredient();

  const [editedIngredientId, setEditedIngredientId] = useState<string | null>(
    null
  );
  const [editedData, setEditedData] = useState<{
    id: string;
    name: string;
    aliases: string;
    allowedUnitIds: string[];
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    aliases: "",
    allowedUnitIds: [] as string[],
  });

  const {
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    filteredAndSortedItems: filteredIngredients,
  } = useSearchAndSort<IngredientResponse, SortableIngredientKey>(ingredients, {
    searchKey: "name",
    sortKeys: ["name", "createdDate", "lastModifiedDate"] as const,
    initialSortKey: "name",
    initialSortOrder: "asc",
  });

  // ===========/==================== //

  const openEditSheet = (ingredient: IngredientResponse) => {
    setEditedIngredientId(ingredient.id);
    setEditedData({
      id: ingredient.id,
      name: ingredient.name,
      aliases: ingredient.aliases.join(", "),
      allowedUnitIds: ingredient.allowedUnits.map((u) => u.id),
    });
  };

  const handleAddIngrediet = () => {
    if (!newIngredient.name.trim()) {
      return toast.error("Tên nguyên liệu không được để trống");
    }

    if (!newIngredient.aliases.trim()) {
      return toast.error("Tên gọi khác nguyên liệu không được để trống");
    }

    if (!newIngredient.allowedUnitIds.length) {
      return toast.error("Tên đơn vị không được để trống");
    }

    console.log(newIngredient);
    addIngredient.mutate(
      {
        name: newIngredient.name.trim(),
        aliases: newIngredient.aliases
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        allowedUnitIds: newIngredient.allowedUnitIds,
      },
      {
        onSuccess: () => {
          toast.success("Đã thêm nguyên liệu");
          setNewIngredient({
            name: "",
            aliases: "",
            allowedUnitIds: [] as string[],
          });
          setIsDialogOpen(false);
        },
        onError: (error) => {
          toast.error(extractErrorMessage(error));
        },
      }
    );
  };

  const handleSave = () => {
    if (!editedData) return;
    const { id, name, aliases, allowedUnitIds } = editedData;
    if (!name.trim()) return toast.error("Tên không được để trống");

    updateIngredient.mutate(
      {
        id,
        name: name.trim(),
        aliases: aliases
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        allowedUnitIds,
      },
      {
        onSuccess: () => {
          toast.success("Đã cập nhật nguyên liệu");
          setEditedIngredientId(null);
          setEditedData(null);
        },
        onError: (error) => {
          console.log(error);
          toast.error(extractErrorMessage(error));
        },
      }
    );
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const upload = useImportFileExcelMutation();
  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    const file = fileInputRef.current.files[0];
    console.log("123")
    setUploading(true);
    upload.mutate(file, {
      onSuccess: () => {
        alert("✅ Upload thành công");
      },
      onError: (err) => {
        console.error(err);
        alert("❌ Upload thất bại");
      },
      onSettled: () => {
        setUploading(false);
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Quản lý nguyên liệu</h1> */}
        <div className="p-4">
          <input placeholder="tải file nguyên liệu" type="file" accept=".xlsx, .xls" ref={fileInputRef} />
          <Button
            onClick={handleUpload}
            disabled={uploading}
            // className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {uploading ? "Uploading..." : "Tải file Excel"}
          </Button>
        </div>
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
            onClick={() => setIsDialogOpen(true)}
          >
            Thêm nguyên liệu
          </Button>
        </div>
      </div>

      <table className="min-w-full border border-gray-300 text-sm table-auto [&>tbody>tr>td]:py-4 [&>thead>tr>th]:py-4">
        <thead className="bg-gray-100 text-center border-b border-gray-300">
          <tr>
            <th className="w-48 border-r">Tên</th>
            {/* <th className="w-48 border-r">Tên gọi khác</th> */}
            <th className="w-48 border-r">Đơn vị cho phép</th>
            <th className="w-28 border-r">Người tạo</th>
            <th className="w-38 border-r">Ngày tạo</th>
            <th className="w-28 border-r">Cập nhật bởi</th>
            <th className="w-38 border-r">Ngày cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {filteredIngredients.map((ingredient: IngredientResponse) => (
            <tr
              key={ingredient.id}
              className="text-center border-t border-gray-300 cursor-pointer hover:bg-gray-50"
              onClick={() => openEditSheet(ingredient)}
            >
              <td className="border-r">{ingredient.name}</td>
              {/* <td className="border-r">{ingredient.aliases.join(", ")}</td> */}
              <td className="border-r text-left px-2 align-top">
                {ingredient.allowedUnits.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {ingredient.allowedUnits.map((u) => (
                      <Badge className="bg-primary/10 text-primary" key={u.id}>
                        {u.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 italic">Không có</span>
                )}
              </td>

              <td className="border-r">{ingredient.createdBy}</td>
              <td className="border-r">
                {ingredient.createdDate
                  ? format(new Date(ingredient.createdDate), "dd/MM/yyyy HH:mm")
                  : "-"}
              </td>

              <td className="border-r">{ingredient.lastModifiedBy}</td>
              <td className="border-r">
                {ingredient.lastModifiedDate
                  ? format(
                      new Date(ingredient.lastModifiedDate),
                      "dd/MM/yyyy HH:mm"
                    )
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Thêm nguyên liệu</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Tên nguyên liệu"
            value={newIngredient.name}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, name: e.target.value })
            }
          />
          <Input
            placeholder="Tên gọi khác"
            value={newIngredient.aliases}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, aliases: e.target.value })
            }
          />
          <Label>Đơn vị</Label>
          <AllowedUnitsSelector
            selectedUnitIds={newIngredient.allowedUnitIds || []}
            onChange={(ids) =>
              setNewIngredient((prev) => ({ ...prev, allowedUnitIds: ids }))
            }
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button onClick={handleAddIngrediet}>Thêm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet
        open={!!editedIngredientId}
        onOpenChange={(open) => !open && setEditedIngredientId(null)}
      >
        <SheetContent
          side="right"
          className="w-[480px] h-screen flex flex-col p-2"
        >
          <SheetHeader>
            <SheetTitle>Chỉnh sửa nguyên liệu</SheetTitle>
          </SheetHeader>
          {editedData && (
            <div className="space-y-3 pt-4 pb-6 overflow-y-auto flex-grow">
              <Label>Tên nguyên liệu</Label>
              <Input
                placeholder="Tên nguyên liệu"
                value={editedData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
              />
              <Label>Tên gọi khác</Label>
              <Input
                placeholder="Tên gọi khác"
                value={editedData.aliases}
                onChange={(e) =>
                  setEditedData({ ...editedData, aliases: e.target.value })
                }
              />
              <Label>Đơn vị</Label>
              <AllowedUnitsSelector
                selectedUnitIds={editedData.allowedUnitIds}
                onChange={(ids) =>
                  setEditedData((prev) =>
                    prev ? { ...prev, allowedUnitIds: ids } : prev
                  )
                }
              />

              <div className="flex gap-2 justify-end mt-auto">
                <Button
                  onClick={handleSave}
                  disabled={updateIngredient.isPending}
                >
                  Lưu
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditedIngredientId(null);
                    setEditedData(null);
                  }}
                >
                  Hủy
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Ingredients;
