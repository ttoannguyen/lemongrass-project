import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

type AuthorProps = {
  author: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string | null;
  };
};

const AuthorHoverCard = ({ author }: AuthorProps) => {
  const avatarUrl =
    author.profilePictureUrl ||
    "https://res.cloudinary.com/didxuklgy/image/upload/v1750257521/27470351_7342052_xx4iiz.jpg";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          to={`/profile/${author.id}`}
          className="inline-flex items-center gap-2 cursor-pointer "
        >
          <img
            src={avatarUrl}
            alt={`${author.firstName} ${author.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-blue-600 hover:underline">
            {author.firstName + " " + author.lastName}
          </span>
        </Link>
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
              to={`/profile/${author.id}`}
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
