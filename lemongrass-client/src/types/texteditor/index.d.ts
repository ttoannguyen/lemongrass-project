import type { LexicalEditor } from "lexical";
import type React from "react";

declare namespace LexicalEditor {
  export type EditorThemeClassName =
    React.HTMLAttributes<HTMLDivElement>["className"];
}
