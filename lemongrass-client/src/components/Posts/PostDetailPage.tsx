import { usePostDetail } from "@/hooks/queries/usePostDetailQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import AuthorHoverCard from "../profile/AuthorHoverCard";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>(); // Next.js useParams
  const { data: post, isLoading, isError } = usePostDetail(postId as string);
  const { account } = useAuth();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(false);

  // Mutation để xử lý like/unlike
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!postId || !account?.username || !post?.author?.id) {
        throw new Error("Thiếu thông tin để thực hiện like");
      }
    //   await postService.toggleLike(postId);
    },
    onSuccess: () => {
      setIsLiked((prev) => !prev);
      // Cập nhật feed và chi tiết bài post
      queryClient.invalidateQueries({ queryKey: ["posts", "feeds"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      toast.success(isLiked ? "Đã bỏ thích bài viết" : "Đã thích bài viết");
    },
    onError: (error) => {
      toast.error(`Lỗi: ${error instanceof Error ? error.message : "Không thể thực hiện like"}`);
    },
  });

  if (!account) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 text-center text-red-500">
        Vui lòng đăng nhập để xem bài viết
      </div>
    );
  }

  if (!postId) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 text-center text-red-500">
        Không tìm thấy ID bài viết
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-1/3 mb-4 bg-gray-200" />
        <Skeleton className="h-4 w-1/2 mb-2 bg-gray-200" />
        <Skeleton className="h-96 w-full mb-4 bg-gray-200" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mt-4">
            <Skeleton className="h-6 w-1/4 mb-2 bg-gray-200" />
            <Skeleton className="h-20 w-full mb-2 bg-gray-200" />
            <Skeleton className="h-40 w-full bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 text-center text-red-500">
        Lỗi tải bài viết
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-muted-foreground mb-4">
        <AuthorHoverCard
          authorId={post.author.id}
          authorUsername={post.author.username}
          profilePictureUrl={post.author.profilePictureUrl !}
          firstName={post.author.firstName}
          lastName={post.author.lastName}
          createdAt={post.createdDate}
        />
      </div>

      <div className="prose dark:prose-invert max-w-none mb-4">
        <p className="text-lg">{post.mainContents}</p>
        {post.contents
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((content, index) => (
            <div key={`${post.id}-${content.displayOrder}-${index}`} className="mt-4">
              <h3 className="text-xl font-semibold">{content.contentTitle}</h3>
              <p>{content.text}</p>
              {content.urlImage && (
                <img src={content.urlImage}/>
                
              )}
            </div>
          ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => likeMutation.mutate()}
          className={`flex items-center gap-2 transition-colors ${
            isLiked ? "text-red-500 hover:text-red-700" : "text-gray-500 hover:text-red-500"
          }`}
          disabled={likeMutation.isPending || !postId || !account?.username || !post?.author?.id}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
          <span>{isLiked ? "Bỏ thích" : "Thích"} ({post.likeCount || 0})</span>
        </button>
        {likeMutation.isPending && <Loader2 className="w-5 h-5 animate-spin" />}
      </div>
    </div>
  );
};

export default PostDetailPage;