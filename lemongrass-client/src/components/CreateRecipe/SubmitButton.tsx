import { useFormContext } from "react-hook-form";

export default function SubmitButton() {
  const { formState: { isSubmitting } } = useFormContext();

  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Saving..." : "Save"}
    </button>
  );
}
