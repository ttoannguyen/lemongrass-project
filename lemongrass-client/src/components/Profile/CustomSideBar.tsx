"use client";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil, UserMinus, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Account } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

type Tab = {
  label: string;
  to: string;
  tooltip: string;
  restricted?: boolean;
};

type Props = {
  account: Account;
  isMe: boolean;
  accountId: string;
  tabs: Tab[];
  isFollowing: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
  onEdit: () => void;

  posts?: number;
  recipes?: number;
  followers: number;
  following: number;
};

const CustomSidebar = ({
  account,
  isMe,
  accountId,
  tabs,
  isFollowing,
  onFollow,
  onUnfollow,
  onEdit,

  followers,
  following,
}: Props) => {
  return (
    <div className="w-[320px] hidden lg:block h-full pt-32 px-4 py-6 bg-white">
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="flex items-center justify-center gap-4">
          <Avatar className="w-16 h-16 transition-all">
            <AvatarImage src={account.profilePictureUrl} />
            <AvatarFallback className="text-lg">
              {account.firstName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="text-center space-y-1">
            <h2 className="text-lg font-semibold">
              {account.firstName} {account.lastName}
            </h2>
            {account.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {account.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <div className="text-center">
            <div className="font-semibold">
              <p>{followers}</p>
            </div>
            <div className="text-xs text-muted-foreground">Người theo dõi</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">
              <p>{following}</p>
            </div>
            <div className="text-xs text-muted-foreground">Đang theo dõi</div>
          </div>
        </div>

        {isMe ? (
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="mt-3 w-full max-w-[150px] hover:bg-primary/10 hover:text-primary"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Chỉnh sửa
          </Button>
        ) : (
          <Button
            onClick={isFollowing ? onUnfollow : onFollow}
            variant={isFollowing ? "secondary" : "default"}
            size="sm"
            className="mt-3 w-full max-w-[150px]"
          >
            {isFollowing ? (
              <>
                <UserMinus className="w-4 h-4 mr-2" />
                Bỏ theo dõi
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Theo dõi
              </>
            )}
          </Button>
        )}
      </div>
      {/* <nav className="px-4">
        <ul className="space-y-2">
          {tabs
            .filter((tab) => !tab.restricted || (tab.restricted && isMe))
            .map((tab) => (
              <li key={tab.to}>
                <NavLink
                  to={`/account/${accountId}${tab.to}`}
                  end
                  className={({ isActive }) =>
                    cn(
                      "block p-3 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )
                  }
                  title={tab.tooltip}
                >
                  {tab.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav> */}
    </div>
  );
};

export default CustomSidebar;
