import { useFormContext } from "react-hook-form";

export const CategoryField = () => {
  const { register } = useFormContext();

  return (
    <div>
      <label>Category</label>
      <select {...register("category")}>
        <option value="VEGETARIAN">Vegetarian</option>
        <option value="VEGAN">Vegan</option>
        <option value="MEAT">Meat</option>
        <option value="DESSERT">Dessert</option>
      </select>
    </div>
  );
};
