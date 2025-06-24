import type { RecipeItem as RecipeType } from "@/types/Recipe/recipe.type";
type Props = {
  recipe: RecipeType;
};

const RecipeItem: React.FC<Props> = ({ recipe }) => {
  return (
    // <div className="rounded-xl shadow p-4 bg-white dark:bg-gray-900">
    //   <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
    //     {recipe.title}
    //   </h2>
    //   <p className="text-sm text-gray-500">
    //     ⏱ Thời gian: {recipe.cookingTime} phút · 🍽 Khẩu phần: {recipe.servings}
    //   </p>
    //   <p className="text-sm mt-1">🥣 Mức độ: {recipe.difficulty}</p>
    //   <div className="flex flex-wrap mt-2 gap-2">
    //     {recipe.tags.map((tag) => (
    //       <span
    //         key={tag.name}
    //         className="text-xs px-2 py-1 rounded-full text-white"
    //         style={{ backgroundColor: tag.color }}
    //       >
    //         #{tag.name}
    //       </span>
    //     ))}
    //   </div>
    // </div>
    <div>Hello</div>
  );
};

export default RecipeItem;
