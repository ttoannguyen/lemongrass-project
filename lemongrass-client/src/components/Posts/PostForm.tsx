import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUploadPreview from "@/components/imageTempale/ImageUploadPreview";
import { useSubmitPost } from "@/hooks/queries/useSubmitPost";
import type { PostCreate } from "@/types/post/PostCreate";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useCreatePost from "@/hooks/useCreatePost";
import { Textarea } from "../ui/textarea";


interface PostFormProps {
  onSuccess?: () => void;
}

const PostForm = ({ onSuccess }: PostFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const {
    title,
    setTitle,
    content,
    setContent,
    images,
    addPostImage,
    removePostImage,
  } = useCreatePost();

  const { mutateAsync: submitPostMutation, isPending } = useSubmitPost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết");
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    if (!content.trim()) {
      setError("Vui lòng nhập nội dung bài viết");
      toast.error("Vui lòng nhập nội dung bài viết");
      return;
    }

    const payload: PostCreate = {
      title,
      content,
      images,
      visibility: "PUBLIC",
    };

    try {
      const recipe = await submitPostMutation(payload);
      console.log("Recipe created:", recipe);
      toast.success("Đăng bài viết thành công!");
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Lỗi không xác định";
      setError(`Lỗi khi tạo bài viết: ${errorMessage}`);
      toast.error(`Lỗi khi tạo bài viết: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Tiêu đề
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề bài viết..."
          className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          Nội dung  
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn đang nghĩ gì?"
          className="min-h-[150px] max-h-[300px] rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          required
        />

      </div>

      <div className="space-y-2">
        <label htmlFor="images" className="text-sm font-medium text-gray-700">
          Tải lên ảnh (tối đa 5)
        </label>
        <ImageUploadPreview
          value={images}
          addImage={addPostImage}
          removeImage={removePostImage}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors duration-200"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Đang đăng...
            </>
          ) : (
            "Đăng bài"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          className="flex-1 rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          disabled={isPending}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default PostForm;

// import { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { GripVertical, Trash2, Loader2, Bold, Italic } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { toast } from "sonner";
// import { marked } from "marked";

// const SortableBlogSectionItem = ({ section, onChange, onDelete }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: section.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleFormat = (type) => {
//     const textarea = document.getElementById(`textarea-${section.id}`);
//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const selectedText = section.content.slice(start, end);
//     let newText;

//     if (type === "bold") {
//       newText = section.content.slice(0, start) + `**${selectedText}**` + section.content.slice(end);
//     } else if (type === "italic") {
//       newText = section.content.slice(0, start) + `*${selectedText}*` + section.content.slice(end);
//     }

//     onChange({ content: newText });
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-2"
//     >
//       <div {...attributes} {...listeners} className="cursor-move text-gray-400">
//         <GripVertical className="h-5 w-5" />
//       </div>
//       {section.type === "text" ? (
//         <div className="flex-1">
//           <div className="flex gap-2 mb-2">
//             <button
//               type="button"
//               onClick={() => handleFormat("bold")}
//               className="p-1 text-gray-600 hover:bg-gray-100 rounded-md"
//               title="In đậm"
//             >
//               <Bold className="w-4 h-4" />
//             </button>
//             <button
//               type="button"
//               onClick={() => handleFormat("italic")}
//               className="p-1 text-gray-600 hover:bg-gray-100 rounded-md"
//               title="Nghiêng"
//             >
//               <Italic className="w-4 h-4" />
//             </button>
//           </div>
//           <textarea
//             id={`textarea-${section.id}`}
//             value={section.content}
//             onChange={(e) => onChange({ content: e.target.value })}
//             placeholder="Nhập đoạn văn... (hỗ trợ Markdown: **in đậm**, *nghiêng*)"
//             className="w-full text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[100px]"
//           />
//         </div>
//       ) : (
//         <img
//           src={URL.createObjectURL(section.file)}
//           alt="Blog Image"
//           className="w-48 max-h-48 object-cover rounded-md"
//         />
//       )}
//       <button
//         onClick={onDelete}
//         className="p-2 text-red-500 hover:bg-red-100 rounded-md transition-colors"
//       >
//         <Trash2 className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// const BlogPostForm = ({ onSuccess }) => {
//   const [title, setTitle] = useState("");
//   const [sections, setSections] = useState([]);
//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
//   );

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const oldIndex = sections.findIndex((s) => s.id === active.id);
//     const newIndex = sections.findIndex((s) => s.id === over.id);
//     const reordered = arrayMove(sections, oldIndex, newIndex);
//     setSections(reordered);
//   };

//   const addTextSection = () => {
//     if (sections.length >= 10) {
//       toast.error("Số lượng section tối đa là 10!");
//       return;
//     }
//     setSections([...sections, { id: uuidv4(), type: "text", content: "" }]);
//   };

//   const addImageSection = (file) => {
//     if (sections.length >= 10) {
//       toast.error("Số lượng section tối đa là 10!");
//       return;
//     }
//     if (file) {
//       setSections([...sections, { id: uuidv4(), type: "image", file }]);
//     }
//   };

//   const updateSection = (id, updated) => {
//     setSections(
//       sections.map((section) =>
//         section.id === id ? { ...section, ...updated } : section
//       )
//     );
//   };

//   const removeSection = (id) => {
//     setSections(sections.filter((section) => section.id !== id));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("Kích thước ảnh không được vượt quá 5MB");
//         return;
//       }
//       addImageSection(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsPending(true);

//     if (!title.trim()) {
//       setError("Vui lòng nhập tiêu đề bài viết");
//       toast.error("Vui lòng nhập tiêu đề bài viết");
//       setIsPending(false);
//       return;
//     }

//     if (!sections.length || sections.every((s) => s.type === "text" && !s.content.trim())) {
//       setError("Vui lòng thêm nội dung hoặc ảnh cho bài viết");
//       toast.error("Vui lòng thêm nội dung hoặc ảnh cho bài viết");
//       setIsPending(false);
//       return;
//     }

//     const payload = {
//       title,
//       sections: sections.map((section, index) => ({
//         ...section,
//         displayOrder: index,
//       })),
//       visibility: "PUBLIC",
//     };

//     try {
//       // Giả lập API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log("Bài đăng được tạo:", payload);
//       toast.success("Đăng bài viết thành công!");
//       if (onSuccess) onSuccess();
//       setTitle("");
//       setSections([]);
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Lỗi không xác định";
//       setError(`Lỗi khi tạo bài viết: ${errorMessage}`);
//       toast.error(`Lỗi khi tạo bài viết: ${errorMessage}`);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const renderPreview = () => {
//     return (
//       <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
//         <h2 className="text-xl font-bold mb-4">{title || "Tiêu đề bài viết"}</h2>
//         {sections.map((section, index) => (
//           <div key={index} className="mb-4">
//             {section.type === "text" ? (
//               <div
//                 className="prose"
//                 dangerouslySetInnerHTML={{ __html: marked(section.content) }}
//               />
//             ) : (
//               <img
//                 src={URL.createObjectURL(section.file)}
//                 alt="Blog Image"
//                 className="w-full max-w-md mx-auto rounded-md"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
//       <div className="flex justify-end mb-4">
//         <button
//           type="button"
//           onClick={() => setShowPreview(!showPreview)}
//           className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
//         >
//           {showPreview ? "Ẩn xem trước" : "Xem trước"}
//         </button>
//       </div>
//       {showPreview ? (
//         renderPreview()
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label
//               htmlFor="title"
//               className="text-sm font-medium text-gray-700"
//             >
//               Tiêu đề
//             </label>
//             <input
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Nhập tiêu đề bài viết..."
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label
//               className="text-sm font-medium text-gray-700"
//             >
//               Nội dung bài viết
//             </label>
//             <div className="border rounded-md p-4 bg-white">
//               <DndContext
//                 sensors={sensors}
//                 collisionDetection={closestCenter}
//                 onDragEnd={handleDragEnd}
//               >
//                 <SortableContext
//                   items={sections.map((s) => s.id)}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   <div className="space-y-2 max-h-[50vh] overflow-y-auto">
//                     {sections.map((section) => (
//                       <SortableBlogSectionItem
//                         key={section.id}
//                         section={section}
//                         onChange={(updated) => updateSection(section.id, updated)}
//                         onDelete={() => removeSection(section.id)}
//                       />
//                     ))}
//                   </div>
//                 </SortableContext>
//               </DndContext>
//               <div className="flex gap-2 mt-4">
//                 <button
//                   type="button"
//                   onClick={addTextSection}
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
//                 >
//                   + Thêm đoạn văn
//                 </button>
//                 <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
//                   + Thêm ảnh
//                   <input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={handleImageUpload}
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>

//           {error && <p className="text-sm text-red-500">{error}</p>}

//           <div className="flex gap-3">
//             <button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//               disabled={isPending}
//             >
//               {isPending ? (
//                 <div className="flex items-center justify-center">
//                   <Loader2 className="w-4 h-4 animate-spin mr-2" />
//                   Đang đăng...
//                 </div>
//               ) : (
//                 "Đăng bài"
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={onSuccess}
//               className="flex-1 bg-gray-100 text-gray-700 rounded-md py-2 hover:bg-gray-200 transition-colors disabled:bg-gray-50"
//               disabled={isPending}
//             >
//               Hủy
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default BlogPostForm;