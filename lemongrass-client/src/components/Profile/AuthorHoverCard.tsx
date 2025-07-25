import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { format, formatDistanceToNow } from "date-fns";
import type { AccountShortResponse } from "@/types/AccountShortResponse";

type AuthorProps = {
  author: AccountShortResponse;
  createdAt: string;
};

const AuthorHoverCard = ({ author, createdAt }: AuthorProps) => {
  const avatarUrl =
    author?.profilePictureUrl ||
    "https://res.cloudinary.com/didxuklgy/image/upload/v1750257521/27470351_7342052_xx4iiz.jpg";

  const formattedDate = format(new Date(createdAt), "MMM d yyyy");
  const relativeTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const isLessThanOneDay = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="inline-flex items-center gap-1">
          <img
            src={avatarUrl}
            alt={`${author.firstName} ${author.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <Link
            to={`/account/${author.id}`}
            className="flex flex-col cursor-pointer "
          >
            <span className="font-medium text-blue-600 hover:underline">
              {author.firstName + " " + author.lastName}
            </span>
            <p className="text-[10px] text-gray-500">
              {isLessThanOneDay(new Date(createdAt))
                ? relativeTime
                : formattedDate}
            </p>
          </Link>
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        sideOffset={8}
        className="bg-white p-4 rounded-lg shadow-lg w-64 z-50 border"
      >
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={`${author.firstName} ${author.lastName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <Link
              to={`/account/${author.id}`}
              className="text-base font-semibold hover:underline"
            >
              {author.firstName + " " + author.lastName}
            </Link>
            <p className="text-sm text-gray-500">@{author.username}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AuthorHoverCard;
