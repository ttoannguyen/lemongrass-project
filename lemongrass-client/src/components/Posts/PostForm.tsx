import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
// import { useEffect, useState } from "react";

type PostFormData = {
  title: string;
  content: string;
  visibility: "public" | "private" | "group";
  groupId?: string;
  recipeId?: string;
  image?: FileList;
};

type Props = {
  onSuccess: () => void;
};

const mockGroups = [
  { id: "g1", name: "Nấu ăn healthy" },
  { id: "g2", name: "Yêu bếp" },
];

const mockRecipes = [
  { id: "r1", title: "Bánh mì bơ tỏi" },
  { id: "r2", title: "Salad cá ngừ" },
];

const PostForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: { visibility: "public" },
  });

  const visibility = watch("visibility");

  const onSubmit = async (data: PostFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("visibility", data.visibility);
      if (data.groupId) formData.append("groupId", data.groupId);
      if (data.recipeId) formData.append("recipeId", data.recipeId);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Lỗi khi tạo bài viết");

      reset();
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 px-1 py-2"
    >
      <Input
        {...register("title", { required: true })}
        placeholder="Tiêu đề bài viết"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">Tiêu đề là bắt buộc</p>
      )}

      <Textarea
        {...register("content", { required: true })}
        placeholder="Bạn đang nghĩ gì?"
        rows={5}
        className="resize-y"
      />
      {errors.content && (
        <p className="text-red-500 text-sm">Nội dung là bắt buộc</p>
      )}

      <Label>Ảnh minh hoạ (tuỳ chọn)</Label>
      <Input type="file" accept="image/*" {...register("image")} />

      <Label>Chế độ hiển thị</Label>
      <Select
        value={visibility}
        onValueChange={(val: string) =>
          setValue("visibility", val as PostFormData["visibility"])
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Chọn chế độ hiển thị" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Công khai</SelectItem>
          <SelectItem value="private">Chỉ mình tôi</SelectItem>
          <SelectItem value="group">Chỉ trong nhóm</SelectItem>
        </SelectContent>
      </Select>

      {visibility === "group" && (
        <>
          <Label>Chọn nhóm</Label>
          <select
            {...register("groupId", { required: true })}
            className="border rounded px-2 py-1"
          >
            <option value="">-- Chọn nhóm --</option>
            {mockGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </>
      )}

      <Label>Gắn kèm công thức (nếu có)</Label>
      <select {...register("recipeId")} className="border rounded px-2 py-1">
        <option value="">-- Không chọn --</option>
        {mockRecipes.map((r) => (
          <option key={r.id} value={r.id}>
            {r.title}
          </option>
        ))}
      </select>

      <div className="flex justify-end">
        <Button type="submit">Đăng bài</Button>
      </div>
    </form>
  );
};

export default PostForm;
