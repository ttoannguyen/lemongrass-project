// // // components/LexicalEditor.tsx
// // "use client";

// // import {
// //   LexicalComposer,
// //   type InitialConfigType,
// // } from "@lexical/react/LexicalComposer";
// // import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// // import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// // import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// // import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// // import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// // import type { EditorThemeClasses, LexicalEditor } from "lexical";

// // import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// // import ToolBars from "./ToolBars";

// // // import "./editor.css"; // bạn có thể tạo CSS riêng cho phần content

// // // const theme: EditorThemeClasses = {
// // //   paragraph: "editor-paragraph",
// // //   text: {},
// // //   quote: "",
// // //   // Bạn có thể thêm các style khác (heading, bold, italic, etc.)
// // // };

// // function onError(error: Error, editor: LexicalEditor) {
// //   console.error("Lexical error:", error, editor);
// // }

// // export default function Editor() {
// //   const initialConfig: InitialConfigType = {
// //     namespace: "MyEditor",
// //     theme: exampleTheme,
// //     onError,
// //     nodes: [HeadingNode, QuoteNode],
// //   };

// //   return (
// //     <LexicalComposer initialConfig={initialConfig}>
// //       <ToolBars />
// //       <div className="p-4 border rounded bg-white">
// //         <RichTextPlugin
// //           contentEditable={<ContentEditable />}
// //           placeholder={<div className="text-gray-400">Enter some text...</div>}
// //           ErrorBoundary={LexicalErrorBoundary}
// //         />
// //         <HistoryPlugin />
// //         <AutoFocusPlugin />
// //       </div>
// //     </LexicalComposer>
// //   );
// // }

// // const exampleTheme = {
// //   ltr: "ltr",
// //   rtl: "rtl",
// //   paragraph: "editor-paragraph",
// //   quote: "editor-quote",
// //   heading: {
// //     h1: "editor-heading-h1",
// //     h2: "editor-heading-h2",
// //     h3: "editor-heading-h3",
// //     h4: "editor-heading-h4",
// //     h5: "editor-heading-h5",
// //     h6: "editor-heading-h6",
// //   },
// //   list: {
// //     nested: {
// //       listitem: "editor-nested-listitem",
// //     },
// //     ol: "editor-list-ol",
// //     ul: "editor-list-ul",
// //     listitem: "editor-listItem",
// //     listitemChecked: "editor-listItemChecked",
// //     listitemUnchecked: "editor-listItemUnchecked",
// //   },
// //   hashtag: "editor-hashtag",
// //   image: "editor-image",
// //   link: "editor-link",
// //   text: {
// //     bold: "editor-textBold",
// //     code: "editor-textCode",
// //     italic: "italic",
// //     strikethrough: "editor-textStrikethrough",
// //     subscript: "editor-textSubscript",
// //     superscript: "editor-textSuperscript",
// //     underline: "underline",
// //     underlineStrikethrough: "editor-textUnderlineStrikethrough",
// //   },
// //   code: "editor-code",
// //   codeHighlight: {
// //     atrule: "editor-tokenAttr",
// //     attr: "editor-tokenAttr",
// //     boolean: "editor-tokenProperty",
// //     builtin: "editor-tokenSelector",
// //     cdata: "editor-tokenComment",
// //     char: "editor-tokenSelector",
// //     class: "editor-tokenFunction",
// //     "class-name": "editor-tokenFunction",
// //     comment: "editor-tokenComment",
// //     constant: "editor-tokenProperty",
// //     deleted: "editor-tokenProperty",
// //     doctype: "editor-tokenComment",
// //     entity: "editor-tokenOperator",
// //     function: "editor-tokenFunction",
// //     important: "editor-tokenVariable",
// //     inserted: "editor-tokenSelector",
// //     keyword: "editor-tokenAttr",
// //     namespace: "editor-tokenVariable",
// //     number: "editor-tokenProperty",
// //     operator: "editor-tokenOperator",
// //     prolog: "editor-tokenComment",
// //     property: "editor-tokenProperty",
// //     punctuation: "editor-tokenPunctuation",
// //     regex: "editor-tokenVariable",
// //     selector: "editor-tokenSelector",
// //     string: "editor-tokenSelector",
// //     symbol: "editor-tokenProperty",
// //     tag: "editor-tokenProperty",
// //     url: "editor-tokenOperator",
// //     variable: "editor-tokenVariable",
// //   },
// // };

// "use client";

// import { EditorContent, EditorRoot } from "novel";
// import { useState } from "react";

// const Editor = () => {
//   const [content, setContent] = useState(null);
//   return (
//     <EditorRoot>
//       {/* <EditorContent
//         initialContent={content}
//         onUpdate={({ editor }) => {
//           const json = editor.getJSON();
//           setContent(json);
//         }}
//       /> */}
//     </EditorRoot>
//   );
// };
// export default Editor;
