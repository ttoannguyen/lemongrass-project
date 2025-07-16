import useCreateRecipe from "@/hooks/useCreateRecipe";
import type { Difficulty } from "@/types/enums/difficulty.enum";
import { useRef, useState } from "react";
import type { ImageUpload } from "@/types/image/ImageUpload";
import { Progress } from "@/components/ui/progress";
import { useSubmitRecipe } from "@/hooks/queries/useSubmitRecipe";
import type { RecipeCreateRequest } from "@/types/Recipe/RecipeRequest";
import { useNavigate } from "react-router-dom";
import type { CategoryResponse } from "@/types/category/CategoryResponse";
import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";

type Props = {
  categories: CategoryResponse[];
  templates: IngredientResponse[];
};

const CreateRecipeForm = ({ categories, templates }: Props) => {
  // console.log(categories);

  const {
    title,
    setTitle,
    description,
    setDescription,
    cookingTime,
    setCookingTime,
    difficulty,
    setDifficulty,
    servings,
    setServings,
    category,
    setCategory,
    ingredients,
    addIngredient,
    updateIngredient,
    removeIngredient,
    instructions,
    addInstruction,
    updateInstruction,
    removeInstruction,
    recipeImages,
    addRecipeImage,
    removeRecipeImage,
    instructionImages,
    addInstructionImage,
    removeInstructionImage,
    tags,
    addTag,
    removeTag,
    getAllowedUnits,
    // submitRecipe,
  } = useCreateRecipe({ templates: templates || [] });

  const { mutateAsync: submitRecipeMutation } = useSubmitRecipe();
  const [tagInput, setTagInput] = useState("");
  const [tagColor, setTagColor] = useState("#FF6666");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleRecipeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        addRecipeImage({
          file,
          displayOrder: recipeImages.length + index + 1,
        });
      });
    }
  };

  const handleInstructionImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    instructionIndex: number
  ) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        addInstructionImage(instructionIndex, {
          file,
          displayOrder:
            (instructionImages[instructionIndex]?.length || 0) + index + 1,
        });
      });
    }
  };
  console.log({
    title,
    cookingTime,
    description,
    difficulty,
    servings,
    category,
    tags,
    ingredients,
    instructions,
    images: recipeImages,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProgress(30);
    console.log("create recipe");

    const payload: RecipeCreateRequest = {
      title,
      cookingTime,
      description,
      difficulty,
      servings,
      category,
      tags,
      ingredients,
      instructions,
      images: recipeImages,
    };

    try {
      const recipe = await submitRecipeMutation(payload);
      console.log("Recipe created:", recipe);
      setProgress(60);
      setTimeout(() => setProgress(100), 500);
      navigate(`/recipe/${recipe.id}`);
    } catch (error) {
      alert(
        "Lỗi khi tạo công thức: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
      setProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Tạo Công Thức</h1>
      {progress > 0 && (
        <div className="fixed top-[-1px] left-0 right-0 z-50">
          <Progress
            value={progress}
            className="relative w-full h-1 bg-yellow-400 "
          />
        </div>
      )}
      {/* Thông tin cơ bản */}
      <div>
        <label htmlFor="title">Tên món ăn</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tên món ăn"
          className="w-full p-2 border rounded"
          required
          id="title"
        />
      </div>

      <div>
        <label htmlFor="cookingTime">Thời gian nấu (giờ)</label>
        <input
          type="number"
          value={cookingTime}
          onChange={(e) => setCookingTime(Number(e.target.value))}
          className="w-full p-2 border rounded"
          min="1"
          required
          id="cookingTime"
        />
      </div>

      <div>
        <label htmlFor="difficulty">Độ khó</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="w-full p-2 border rounded"
          required
          id="difficulty"
        >
          <option value="EASY">Dễ</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="HARD">Khó</option>
        </select>
      </div>

      <div>
        <label htmlFor="servings">Khẩu phần</label>
        <input
          type="number"
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
          className="w-full p-2 border rounded"
          min="1"
          required
          id="servings"
        />
      </div>

      {/* <div>
        <label htmlFor="category">Danh mục</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
          id="category"
        />
      </div> */}

      <div>
        <label htmlFor="category">Danh mục</label>
        <select
          // multiple
          value={category}
          onChange={(e) =>
            setCategory(
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          className="w-full p-2 border rounded"
          required
          id="category"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description">Mô tả</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          id="description"
        />
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
              addTag({ name: tagInput, color: tagColor });
              setTagInput("");
            }}
            className="bg-blue-500 text-white px-2 rounded"
          >
            Thêm
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span
                className="px-2 py-1 rounded text-white"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
              <button
                type="button"
                onClick={() => removeTag(idx)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Nguyên liệu */}
      <div>
        <h2 className="font-semibold">Nguyên liệu</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={ingredient.templateId}
              onChange={(e) =>
                updateIngredient(index, { templateId: e.target.value })
              }
              className="p-1 border rounded"
              required
            >
              <option value="">Chọn nguyên liệu</option>
              {templates?.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={ingredient.quantity}
              onChange={(e) =>
                updateIngredient(index, { quantity: Number(e.target.value) })
              }
              placeholder="Số lượng"
              className="w-24 border p-1 rounded"
              required
            />
            <select
              value={ingredient.unitId}
              onChange={(e) =>
                updateIngredient(index, { unitId: e.target.value })
              }
              className="p-1 border rounded"
            >
              <option value="">Đơn vị</option>
              {getAllowedUnits(ingredient.templateId).map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <input
              value={ingredient.note || ""}
              onChange={(e) =>
                updateIngredient(index, { note: e.target.value })
              }
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
          onClick={addIngredient}
          className="bg-green-500 text-white px-2 rounded"
        >
          + Thêm nguyên liệu
        </button>
      </div>

      {/* Hướng dẫn */}
      <div>
        <h2 className="font-semibold">Hướng dẫn</h2>
        {instructions.map((instruction, index) => (
          <div key={instruction.stepNumber} className="space-y-2 mb-4">
            <div className="flex gap-2">
              <textarea
                value={instruction.description}
                onChange={(e) =>
                  updateInstruction(index, { description: e.target.value })
                }
                placeholder={`Bước ${index + 1}`}
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="text-red-500"
              >
                Xóa
              </button>
            </div>
            <div>
              <label>Hình ảnh cho bước {index + 1}</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleInstructionImageUpload(e, index)}
                className="w-full p-2 border rounded"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {instructionImages[index]?.map(
                  (image: ImageUpload, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <img
                        src={URL.createObjectURL(image.file)}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeInstructionImage(index, imgIndex)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addInstruction}
          className="bg-green-500 text-white px-2 rounded"
        >
          + Thêm bước
        </button>
      </div>

      {/* Ảnh món ăn */}
      <div>
        <h2 className="font-semibold">Hình ảnh món ăn</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleRecipeImageUpload}
          className="w-full p-2 border rounded"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {recipeImages.map((image: ImageUpload, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image.file)}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeRecipeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <canvas ref={canvasRef} className="hidden" />
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

export default CreateRecipeForm;
