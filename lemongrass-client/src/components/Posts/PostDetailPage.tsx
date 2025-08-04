// "use client";

// import { useParams } from "react-router-dom";
// import { usePostDetail } from "@/hooks/queries/usePostDetailQuery";
// import { Skeleton } from "@/components/ui/skeleton";
// import AuthorHoverCard from "../profile/AuthorHoverCard";
// import { useAuth } from "@/contexts/AuthContext";
// import { Heart } from "lucide-react";
// import { useState } from "react";
// import axios from "axios";

// const PostDetailPage = () => {
//   const { postId } = useParams<{ postId: string }>();
//   const { data: post, isLoading, isError } = usePostDetail(postId || "");
//   const { account } = useAuth();
//   const [isLiked, setIsLiked] = useState(false);

//   const handleToggleHeart = async () => {
//     if (!postId || !account?.username || !post?.author?.id) return;

//     try {
//       await axios.post(
//         `http://localhost:8080/api/_v1/reaction/like/${postId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );

//       setIsLiked((prev) => !prev);
//     } catch (err) {
//       console.error("Lỗi khi gửi like:", err);
//     }
//   };

//   if (!account) return <div>Đang tải...</div>;
//   if (!postId) return <div>Không tìm thấy ID bài viết</div>;
//   if (isLoading) {
//     return (
//       <div className="max-w-3xl mx-auto py-8 px-4">
//         <Skeleton className="bg-text h-8 w-1/3 mb-4" />
//         <Skeleton className="bg-text h-4 w-1/2 mb-2" />
//         <Skeleton className="bg-text h-96 w-full mb-4" />
//       </div>
//     );
//   }
//   if (isError || !post) return <div>Lỗi tải bài viết</div>;

//   return (
//     <div className="max-w-3xl mx-auto py-8 px-4">
//       <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
//       <div className="text-sm text-muted-foreground mb-4">
//         <AuthorHoverCard author={post.author!} createdAt={post.createdDate} />
//       </div>

//       {post.images && post.images.length > 0 && (
//         <div className="mb-6">
//           <img
//             src={post.images[0].url}
//             alt="Post Main Image"
//             className="w-full h-72 object-cover mb-4 rounded"
//           />
//           {post.images.length > 1 && (
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
//               {post.images.slice(1).map((img, index) => (
//                 <img
//                   key={index}
//                   src={img.url}
//                   alt={`Post image ${index + 2}`}
//                   className="w-full h-40 object-cover rounded"
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       <div className="prose dark:prose-invert max-w-none mb-4">
//         <p>{post.content}</p>
//       </div>

//       <div className="flex items-center gap-2 mt-2">
//         <button
//           onClick={handleToggleHeart}
//           className="flex items-center gap-2 text-red-500 hover:text-red-700"
//           disabled={!postId || !account?.username || !post?.author?.id}
//         >
//           <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
//           <span>{isLiked ? "Bỏ thích" : "Thích"}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostDetailPage;
