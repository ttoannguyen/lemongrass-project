import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type Tag = {
  name: string;
  color: string;
};

const TagsField = () => {
  const { register, control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: "tags", control });

  const [tagInput, setTagInput] = useState("");
  const [tagColor, setTagColor] = useState("#000000");
  const tags: Tag[] = watch("tags") || [];

  const addTag = (tag: Tag) => {
    append(tag);
  };

  const removeTag = (index: number) => {
    remove(index);
  };

  return (
    <div className="mt-4">
      <Label htmlFor="tagsfield">Tags</Label>
      <div className="flex gap-2 mt-1">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Tên tag"
        />
        <input
          type="color"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
          className="w-10 h-10 p-1 border rounded"
        />
        <button
          type="button"
          onClick={() => {
            if (tagInput.trim() === "") return;
            addTag({ name: tagInput, color: tagColor });
            setTagInput("");
          }}
          className="bg-blue-500 text-white px-3 hover:bg-blue-600"
        >
          Thêm
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {fields.map((tag, index) => (
          <div key={tag.id} className="flex items-center gap-1">
            <span
              className="px-2 py-1 rounded text-white text-sm"
              style={{ backgroundColor: tags[index]?.color || "#000" }}
            >
              {tags[index]?.name}
            </span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-red-500 font-bold hover:text-red-700"
            >
              ×
            </button>
            {/* Hidden fields for form submission */}
            <input
              type="hidden"
              {...register(`tags.${index}.name`)}
              value={tags[index]?.name}
            />
            <input
              type="hidden"
              {...register(`tags.${index}.color`)}
              value={tags[index]?.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsField;
