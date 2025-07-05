import { useFieldArray, useFormContext } from "react-hook-form";

export default function InstructionsForm() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructions",
  });

  return (
    <div>
      <label>Instructions</label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <textarea {...register(`instructions.${index}.text`)} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ text: "" })}>
        Add Step
      </button>
    </div>
  );
}
