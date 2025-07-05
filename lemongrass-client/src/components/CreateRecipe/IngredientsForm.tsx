import { useFieldArray, useFormContext } from "react-hook-form";

export default function IngredientsForm() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div>
      <label>Ingredients</label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`ingredients.${index}.name`)}
            placeholder="Name"
          />
          <input
            {...register(`ingredients.${index}.quantity`)}
            placeholder="Qty"
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", quantity: "" })}>
        Add Ingredient
      </button>
    </div>
  );
}
