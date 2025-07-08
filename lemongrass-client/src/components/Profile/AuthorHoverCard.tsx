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
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="font-medium text-blue-600 cursor-pointer hover:underline">
          {author.firstName + " " + author.lastName}
        </span>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        sideOffset={8}
        className="bg-white p-4 rounded-lg shadow-lg w-64 z-50 border"
      >
        <div className="flex items-center gap-4">
          <img
            src={
              author.profilePictureUrl ||
              "https://res.cloudinary.com/didxuklgy/image/upload/v1750257521/27470351_7342052_xx4iiz.jpg"
            }
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <Link
              to={`/profile/${author.id}`}
              className="text-base font-semibold"
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
