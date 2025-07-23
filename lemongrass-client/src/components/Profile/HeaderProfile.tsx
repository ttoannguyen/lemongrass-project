import type { Account } from "@/types";
import AvataProfile from "./AvataProfile";
import CoverImage from "./CoverImage";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  account: Account;
  currentUser?: Account | null;
};

const HeaderProfile = ({ account }: Props) => {
  const { isLoggedIn, account: currentAccount } = useAuth();
  const { pathname } = useLocation();
  const { accountId: rawAccountId } = useParams<{ accountId?: string }>();

  // const accountId = rawAccountId ?? currentAccount?.id ?? ""; // fallback an toàn

  const isMe =
    (!rawAccountId && !!currentAccount) ||
    rawAccountId === currentAccount?.id ||
    (pathname.includes("/new-recipe") && isLoggedIn);
  return (
    <div className="bg-background ">
      {/* Cover Image */}
      <CoverImage
        ratio={6 / 1}
        src="https://res.cloudinary.com/didxuklgy/image/upload/v1750404835/2461928_125_r9gdcb.svg"
      />

      <div className=" bg-white">
        <div className="px-30 flex bottom-0 md:right-0 left-4 md:left-0">
          <div className="relative h-30">
            <AvataProfile
              account={account}
              className="absolute bottom-16  h-20 m-2 w-20 md:h-40 md:w-40 rounded-full border-4 border-background bg-background shadow-md"
            />
          </div>
          <h1 className="text-xl ml-1 mt-2 md:text-3xl font-bold ">
            {`${account?.firstName} ${account?.lastName}`}
          </h1>

          <div className="flex md:mt-4 ml-auto md:h-16 z-10">
            {isMe == false ? (
              <>
                <Button variant={"main"}>Follow</Button>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical
                      height={"36px"}
                      className="text-secondary cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white border-none shadow h-10 md:w-40"
                  >
                    <DropdownMenuItem className="text-text  focus:bg-background">
                      Report Abuse
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant={"secondary"}>Edit Profile</Button>
            )}
          </div>
        </div>
        <div className="flex gap-2 mx-40 border-b">
          <Link
            className="px-4 py-2 hover:bg-[#e5f6f0]"
            to={`/account/${account.id}`}
          >
            Recipe
          </Link>
          <Link
            className="px-4 py-2 hover:bg-[#e5f6f0]"
            to={`/account/${account.id}/post`}
          >
            Post
          </Link>
          {isMe && (
            <Link
              className="px-4 py-2 hover:bg-[#e5f6f0]"
              to={"/account/new-recipe"}
            >
              Create recipe
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;