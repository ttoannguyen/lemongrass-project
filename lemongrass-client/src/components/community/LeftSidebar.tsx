// src/components/Community/LeftSidebar.tsx
import { Link } from "react-router-dom";
import { Plus, Hash, Users, TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import CreateGroupForm from "../group/CreateGroupForm";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const mockGroups = [
  { id: "1", name: "Healthy Eating" },
  { id: "2", name: "Vegan Lovers" },
  { id: "3", name: "Quick Meals" },
];

const mockHashtags = ["#mealprep", "#budgetfriendly", "#glutenfree"];

const LeftSidebar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <aside className="w-[250px] hidden lg:block h-full px-4 py-6 bg-background">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Community
          </h2>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/community" className="hover:underline">
              🏠 Home Feed
            </Link>
            <Link
              to="/community/trending"
              className="hover:underline flex items-center gap-1"
            >
              <TrendingUp className="w-4 h-4" /> Trending
            </Link>
            <Link
              to="/community/my-groups"
              className="hover:underline flex items-center gap-1"
            >
              <Users className="w-4 h-4" /> My Groups
            </Link>
          </nav>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Your Groups
            </h2>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new community group.
                  </DialogDescription>
                </DialogHeader>
                <CreateGroupForm onSuccess={() => setOpenDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <ScrollArea className="h-32">
            <div className="flex flex-col gap-1">
              {mockGroups.map((group) => (
                <Link
                  key={group.id}
                  to={`/community/group/${group.id}`}
                  className="text-sm hover:underline text-foreground"
                >
                  • {group.name}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-1">
            Popular Hashtags
          </h2>
          <div className="flex flex-col gap-1">
            {mockHashtags.map((tag) => (
              <Link
                key={tag}
                to={`/community/hashtag/${tag.replace("#", "")}`}
                className="text-sm hover:underline text-blue-600"
              >
                <Hash className="inline-block w-4 h-4 mr-1" /> {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
