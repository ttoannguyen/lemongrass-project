import React, { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, type TextFormatType } from "lexical";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const ToolBars = () => {
  const [editor] = useLexicalComposerContext();

  // Trạng thái toggle
  const [formats, setFormats] = useState<string[]>([]);

  const toggleFormat = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    setFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      value={formats}
      onValueChange={(values: React.SetStateAction<string[]>) =>
        setFormats(values)
      }
      className="mb-2"
    >
      <ToggleGroupItem
        value="bold"
        aria-label="Toggle bold"
        onClick={() => toggleFormat("bold")}
      >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        onClick={() => toggleFormat("italic")}
      >
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="underline"
        aria-label="Toggle underline"
        onClick={() => toggleFormat("underline")}
      >
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ToolBars;
