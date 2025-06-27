import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { Difficulty } from "@/types/enums/difficulty.enum";
import type { ImageDto } from "@/types/image/ImageDto";
import type { IngredientDto } from "@/types/ingredient/IngredientDto";
import type { InstructionDto } from "@/types/instruction/InstructionDto";
import type { TagDto } from "@/types/tag/TagDto";

export type RecipeCreateRequest = {
  title: string;
  cookingTime: number;
  difficulty: Difficulty;
  servings: number;
  category: string;
  tags: TagDto[];
  ingredients: IngredientDto[];
  instructions: InstructionDto[];
  images?: ImageDto[];
};

interface ExtendedIngredientDto extends IngredientDto {
  unitId?: string;
  note?: string;
}

const mockUnits = [
  { id: "lit-id", name: "lit" },
  { id: "g-id", name: "g" },
];

const mockIngredients = [
  { id: "template1", name: "Cá" },
  { id: "template2", name: "Cà chua" },
];

const CreateRecipe = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RecipeCreateRequest>({
    defaultValues: {
      title: "",
      cookingTime: 1,
      difficulty: Difficulty.MEDIUM,
      servings: 1,
      category: "",
      tags: [],
      ingredients: [],
      instructions: [],
      images: [],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const [tagInput, setTagInput] = useState("");
  const [tagColor, setTagColor] = useState("#FF6666");

  const onSubmit = (data: RecipeCreateRequest) => {
    // Assign stepNumber, order, and generate IDs
    data.instructions = data.instructions.map((ins, idx) => ({
      ...ins,
      id: ins.id || `instruction-${idx + 1}`,
      stepNumber: idx + 1,
    }));
    data.ingredients = data.ingredients.map(
      (ing: ExtendedIngredientDto, idx) => ({
        id: ing.id || `ingredient-${idx + 1}`,
        name: mockIngredients.find((i) => i.id === ing.id)?.name || "",
        quantity: String(ing.quantity),
        order: idx + 1,
      })
    );

    console.log("Submitted Recipe:", data);
    // Send API request here if needed
    // axios.post('/api/recipes', data)
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            appendImage({
              url: event.target.result as string,
              // alt: file.name,
              displayOrder: imageFields.length + index + 1,
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-3xl mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold">Tạo Công Thức</h1>

      <div>
        <input
          {...register("title", { required: "Tên món ăn là bắt buộc" })}
          placeholder="Tên món ăn"
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <input
          type="number"
          {...register("cookingTime", {
            required: "Thời gian nấu là bắt buộc",
            min: { value: 1, message: "Thời gian nấu phải lớn hơn 0" },
          })}
          placeholder="Thời gian nấu (giờ)"
          className="w-full p-2 border rounded"
        />
        {errors.cookingTime && (
          <p className="text-red-500">{errors.cookingTime.message}</p>
        )}
      </div>

      <div>
        <select
          {...register("difficulty", { required: "Độ khó là bắt buộc" })}
          className="w-full p-2 border rounded"
        >
          <option value="">Chọn độ khó</option>
          <option value="EASY">Dễ</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="HARD">Khó</option>
        </select>
        {errors.difficulty && (
          <p className="text-red-500">{errors.difficulty.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register("servings", {
            required: "Khẩu phần là bắt buộc",
            min: { value: 1, message: "Khẩu phần phải lớn hơn 0" },
          })}
          placeholder="Khẩu phần"
          className="w-full p-2 border rounded"
        />
        {errors.servings && (
          <p className="text-red-500">{errors.servings.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("category", { required: "Danh mục là bắt buộc" })}
          placeholder="Danh mục (vd: Canh, Món chính)"
          className="w-full p-2 border rounded"
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label>Tags</label>
        <div className="flex gap-2 mt-1">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Tên tag"
            className="border p-1 rounded"
          />
          <input
            type="color"
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              if (tagInput.trim() === "") return;
              const currentTags = getValues("tags");
              setValue("tags", [
                ...currentTags,
                { name: tagInput, color: tagColor },
              ]);
              setTagInput("");
            }}
            className="bg-blue-500 text-white px-2 rounded"
          >
            Thêm
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {watch("tags").map((tag, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span
                className="px-2 py-1 rounded text-white"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  const updatedTags = watch("tags").filter((_, i) => i !== idx);
                  setValue("tags", updatedTags);
                }}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <h2 className="font-semibold">Nguyên liệu</h2>
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <select
              {...register(`ingredients.${index}.id`, {
                required: "Nguyên liệu là bắt buộc",
              })}
              className="p-1 border rounded"
            >
              <option value="">Chọn nguyên liệu</option>
              {mockIngredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              {...register(`ingredients.${index}.quantity`, {
                required: "Số lượng là bắt buộc",
              })}
              placeholder="Số lượng"
              className="w-24 border p-1 rounded"
            />
            <select
              {...register(`ingredients.${index}.unitId`)}
              className="p-1 border rounded"
            >
              <option value="">Chọn đơn vị</option>
              {mockUnits.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              {...register(`ingredients.${index}.note`)}
              placeholder="Ghi chú"
              className="flex-1 border p-1 rounded"
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-500"
            >
              Xóa
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendIngredient({
              id: "",
              name: "",
              quantity: "",
              order: ingredientFields.length + 1,
              unitId: "",
              note: "",
            })
          }
          className="bg-green-506 text-black cursor-pointer px-2 rounded"
        >
          + Thêm nguyên liệu
        </button>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="font-semibold">Hướng dẫn</h2>
        {instructionFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <textarea
              {...register(`instructions.${index}.description`, {
                required: "Mô tả bước là bắt buộc",
              })}
              placeholder={`Bước ${index + 1}`}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeInstruction(index)}
              className="text-red-500"
            >
              Xóa
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendInstruction({
              id: `instruction-${instructionFields.length + 1}`,
              stepNumber: instructionFields.length + 1,
              description: "",
            })
          }
          className="bg-green-506 text-black cursor-pointer px-2 rounded"
        >
          + Thêm bước
        </button>
      </div>

      {/* Images */}
      <div>
        <h2 className="font-semibold">Hình ảnh</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {imageFields.map((field, index) => (
            <div key={field.id} className="relative">
              <img
                src={field.url}
                alt={field.alt}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tạo công thức
      </button>
    </form>
  );
};

export default CreateRecipe;
