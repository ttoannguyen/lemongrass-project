import { type PostResponse } from "@/types/post/PostResponse";
import { format, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const PostCard = ({ post }: { post: PostResponse }) => {
  const { author, title, createdDate, mainContents, contents } = post;

  const dateObj = new Date(createdDate);
  const formattedDate = format(dateObj, "MMM d yyyy");
  const relativeTime = formatDistanceToNow(dateObj, { addSuffix: true });

  const isLessThanOneDay = (date: Date) =>
    (Date.now() - date.getTime()) / (1000 * 60 * 60) < 24;

  const capitalizeFirstLetter = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Card content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={author.profilePictureUrl || "/default-avatar.png"}
            alt={author.username}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <Link
              to={`/account/${author.id}`}
              className="font-semibold text-gray-800 hover:underline"
            >
              {author.firstName + " " + author.lastName}
            </Link>
            <p className="text-[11px] text-gray-500">
              {capitalizeFirstLetter(
                isLessThanOneDay(dateObj) ? relativeTime : formattedDate
              )}
            </p>
          </div>
        </div>

        {/* Title */}
        <Link
          to={`post/${post.id}`}
          className="font-bold text-lg text-gray-900 hover:underline"
        >
          {title}
        </Link>

        {/* Image */}
        {contents?.[0]?.urlImage && (
          <img
            src={contents[0].urlImage}
            alt={title}
            className="w-full h-52 object-cover rounded-md"
          />
        )}

        {/* Main contents */}
        <p className="text-gray-700 text-sm line-clamp-3">{mainContents}</p>

        {/* Actions (like/comment) */}
        {/* 
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Heart size={16} /> {likeCount}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} /> {commentCount}
          </div>
        </div> 
        */}
      </div>
    </div>
  );
};

export default PostCard;
