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
  stats?: {
    posts: number;
    recipes: number;
    followers: number;
    following: number;
  };
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
  stats,
}: Props) => {
  //   const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  //   const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);

  //   const toggleSidebar = () => {
  //     setIsSidebarOpen((prev) => !prev);
  //   };

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
        {stats && (
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="text-center">
              <span className="font-medium text-foreground">{stats.posts}</span>
              <p>Bài viết</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-foreground">
                {stats.recipes}
              </span>
              <p>Công thức</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-foreground">
                {stats.followers}
              </span>
              <p>Người theo dõi</p>
            </div>
          </div>
        )}
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
      <nav className="px-4">
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
      </nav>
      {/* <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 bg-white">
          <div className="p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsMobileSheetOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
            <SidebarProfileCard
              account={account}
              isMe={isMe}
              onEdit={() => {
                onEdit();
                setIsMobileSheetOpen(false);
              }}
              onFollow={onFollow}
              onUnfollow={onUnfollow}
              isFollowing={isFollowing}
              stats={stats}
            />
          </div>
          <nav className="px-4">
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
                      onClick={() => setIsMobileSheetOpen(false)}
                      title={tab.tooltip}
                    >
                      {tab.label}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet> */}
    </div>
  );
};

export default CustomSidebar;
