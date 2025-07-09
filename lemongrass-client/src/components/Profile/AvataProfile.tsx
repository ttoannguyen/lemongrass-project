import type { Account } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  className?: string;
  account?: Account;
};

const AvataProfile = ({ className, account }: Props) => {
  const username = account?.username || "User";
  const avatarFallback = username.slice(0, 2).toUpperCase();

  return (
    <Avatar className={`${className}`}>
      <AvatarImage
        src={
          account?.profilePictureUrl
            ? account.profilePictureUrl
            : "https://res.cloudinary.com/didxuklgy/image/upload/v1750257521/27470351_7342052_xx4iiz.jpg"
        }
        alt="Avatar"
        className="object-cover"
      />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvataProfile;
