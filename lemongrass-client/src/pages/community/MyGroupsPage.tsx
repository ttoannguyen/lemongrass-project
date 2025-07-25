// src/pages/community/MyGroupsPage.tsx
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const myGroups = [
  {
    id: "1",
    name: "Healthy Eating",
    description: "Tips and discussions for a balanced lifestyle.",
    memberCount: 154,
  },
  {
    id: "2",
    name: "Quick Meals",
    description: "Share your fast and tasty recipes.",
    memberCount: 89,
  },
];

const MyGroupsPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-headline" />
          <h1 className="text-2xl font-bold">My Groups</h1>
        </div>
        <Button asChild>
          <Link to="/community/create-group">+ Create Group</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {myGroups.map((group) => (
          <Link
            to={`/community/group/${group.id}`}
            key={group.id}
            className="block p-4 rounded-lg bg-muted shadow hover:bg-muted/80 transition"
          >
            <h2 className="font-semibold text-xl">{group.name}</h2>
            <p className="text-sm text-muted-foreground">{group.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {group.memberCount} members
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyGroupsPage;
