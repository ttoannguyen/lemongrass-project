import type { PostFeedItem } from "@/types/feed/PostFeedItem";
import { Link } from "react-router-dom";

type Props = {
  post: PostFeedItem;
};

const PostItemCard = ({ post }: Props) => {
  return (
    <div className="border p-4 m-5 rounded shadow ">
      <Link to={`/post/${post.id}`} className="text-lg font-semibold ">
        {post.title}
      </Link>
      <p className="text-sm text-gray-500">{post.content}</p>
      <p>
        {post.tags?.map((tag) => (
          <span key={tag.name} className="mr-2">
            #{tag.name}
          </span>
        ))}
      </p>
    </div>
  );
};

export default PostItemCard;
