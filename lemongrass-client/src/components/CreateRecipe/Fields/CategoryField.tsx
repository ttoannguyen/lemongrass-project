import { useFormContext } from "react-hook-form";

export const CategoryField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="block font-medium mb-1">Category</label>
      <select
        {...register("category")}
        className="w-full border border-gray-300 p-2 rounded"
        defaultValue=""
      >
        <option value="" disabled>
          -- Select Category --
        </option>
        <option value="VEGETARIAN">Vegetarian</option>
        <option value="VEGAN">Vegan</option>
        <option value="MEAT">Meat</option>
        <option value="DESSERT">Dessert</option>
      </select>

      {errors.category && (
        <p className="text-sm text-red-500 mt-1">
          {errors.category.message as string}
        </p>
      )}
    </div>
  );
};
