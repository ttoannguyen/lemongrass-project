// // components/editor/Editor.tsx
// "use client";

// import { useEffect, useRef, useCallback } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import Paragraph from "@editorjs/paragraph";
// import Image from "@editorjs/image";

// interface EditorProps {
//   onChange: (data: string) => void;
//   initialData?: any;
// }

// let editor: EditorJS | null = null;

// export default function Editor({ onChange, initialData }: EditorProps) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   const initializeEditor = useCallback(() => {
//     if (!ref.current) return;

//     editor = new EditorJS({
//       holder: ref.current,
//       data: initialData || { blocks: [] },
//       placeholder: "Viết gì đó thú vị...",
//       inlineToolbar: true,
//       onChange: async () => {
//         const savedData = await editor?.save();
//         onChange(JSON.stringify(savedData));
//       },
//       tools: {
//         header: Header,
//         paragraph: Paragraph,
//         image: {
//           class: Image,
//           config: {
//             endpoints: {
//               byFile: "/api/upload", // hoặc null nếu chưa có
//               byUrl: null,
//             },
//           },
//         },
//       },
//     });
//   }, [onChange, initialData]);

//   useEffect(() => {
//     initializeEditor();
//     return () => {
//       editor?.destroy();
//       editor = null;
//     };
//   }, [initializeEditor]);

//   return <div ref={ref} className="border rounded-md p-4 bg-white" />;
// }

import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import { useEffect, useRef } from "react";

const Editor = ({
  initialData,
  onChange,
}: {
  initialData?: any;
  onChange?: (data: string) => void;
}) => {
  const ref = useRef<EditorJS | null>(null);
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current && holder.current) {
      ref.current = new EditorJS({
        holder: holder.current,
        data: initialData,
        onReady: () => console.log("Editor.js ready"),
        onChange: async () => {
          const content = await ref.current?.save();
          onChange?.(JSON.stringify(content));
        },
        tools: {
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // 🟢 Replace this with your actual API call
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();

                  return {
                    success: 1,
                    file: {
                      url: data.url,
                    },
                  };
                },
              },
            },
          },
        },
        placeholder: "Viết nội dung bài viết ở đây...",
      });
    }

    return () => {
      ref.current?.destroy?.();
      ref.current = null;
    };
  }, []);

  return <div ref={holder} />;
};

export default Editor;
