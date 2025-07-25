import { Heart, MessageCircle } from "lucide-react";
import { type PostResponse } from "@/types/post/PostResponse";

const PostCard = ({ post }: { post: PostResponse }) => {
  const { author, content, images, createdDate, likeCount, commentCount } =
    post;

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2 border">
      <div className="flex items-center gap-3">
        <img
          src={author.profilePictureUrl}
          alt={author.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{author.username}</p>
          <p className="text-xs text-gray-500">
            {new Date(createdDate).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="text-gray-800 whitespace-pre-line">{content}</p>

      {images && (
        <img
          src={images[0].url}
          alt="Ảnh bài viết"
          className="w-full rounded-md object-cover"
        />
      )}

      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-1">
          <Heart size={16} /> {likeCount}
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle size={16} /> {commentCount}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
