import FeedImageTemplate from "@/components/imageTempale/FeedImageTemplate";
import AuthorHoverCard from "@/components/Profile/AuthorHoverCard";
import type { PostFeedItem } from "@/types/feed/PostFeedItem";
import { Link } from "react-router-dom";

type Props = {
  post: PostFeedItem;
};

const PostItemCard = ({ post }: Props) => {
  return (
    <div className="shadow max-w-2xl mt-2 w-full mx-auto overflow-hidden max-h-[500px] flex flex-col">
      <div className="h-[200px] w-full shrink-0 relative z-0">
        <FeedImageTemplate image={post.imageResponses} />
      </div>

      <div className="p-4">
        <AuthorHoverCard
          author={post.accountShortResponse!}
          createdAt={post.createAt}
        />
      </div>
      <Link to={`/post/${post.id}`}>
        <p className="text-lg font-semibold mb-2 hover:text-green-500">
          {post.title}
        </p>
      </Link>

      <div className="flex justify-between">
        <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
      </div>
    </div>
  );
};

export default PostItemCard;
