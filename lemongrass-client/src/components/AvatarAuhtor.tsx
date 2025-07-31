import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  avatarUrl?: string | "";
  avatarFallback: string | "AV";
  className?: string;
};

const AvatarAuthor = ({ avatarUrl, className }: Props) => {
  return (
    <Avatar className="size-16 my-2">
      <AvatarImage
        className={className}
        src={avatarUrl || "/src/assets/images/user.png"}
      />
    </Avatar>
  );
};

export default AvatarAuthor;
