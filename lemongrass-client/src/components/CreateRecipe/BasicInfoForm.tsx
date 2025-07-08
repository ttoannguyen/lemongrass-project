import { useFormContext } from "react-hook-form";
import type { Difficulty } from "@/types/enums/difficulty.enum";

interface RecipeFormValues {
  title: string;
  description: string;
  cookingTime: number;
  difficulty: Difficulty;
  servings: number;
  category: string;
  ingredients: {
    templateId: string;
    quantity: number;
    unitId: string;
    note?: string;
  }[];
  instructions: { stepNumber: number; description: string }[];
  tags: { name: string; color: string }[];
}

const BasicInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title">Tên món ăn</label>
        <input
          {...register("title", { required: "Tên món ăn là bắt buộc" })}
          placeholder="Tên món ăn"
          className="w-full p-2 border rounded"
          id="title"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="cookingTime">Thời gian nấu (giờ)</label>
        <input
          type="number"
          {...register("cookingTime", {
            required: "Thời gian nấu là bắt buộc",
            min: { value: 1, message: "Thời gian nấu phải lớn hơn 0" },
          })}
          className="w-full p-2 border rounded"
          id="cookingTime"
        />
        {errors.cookingTime && (
          <span className="text-red-500">{errors.cookingTime.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="difficulty">Độ khó</label>
        <select
          {...register("difficulty", { required: "Độ khó là bắt buộc" })}
          className="w-full p-2 border rounded"
          id="difficulty"
        >
          <option value="EASY">Dễ</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="HARD">Khó</option>
        </select>
        {errors.difficulty && (
          <span className="text-red-500">{errors.difficulty.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="servings">Khẩu phần</label>
        <input
          type="number"
          {...register("servings", {
            required: "Khẩu phần là bắt buộc",
            min: { value: 1, message: "Khẩu phần phải lớn hơn 0" },
          })}
          className="w-full p-2 border rounded"
          id="servings"
        />
        {errors.servings && (
          <span className="text-red-500">{errors.servings.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="category">Danh mục</label>
        <input
          {...register("category", { required: "Danh mục là bắt buộc" })}
          className="w-full p-2 border rounded"
          id="category"
        />
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="description">Mô tả</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded"
          id="description"
        />
      </div>
    </div>
  );
};

export default BasicInfoForm;
