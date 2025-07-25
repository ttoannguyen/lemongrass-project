// src/components/Community/RightSidebar.tsx
import { Link } from "react-router-dom";
import { Bell, Users, Hash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentUsers = [
  { name: "Annie", avatar: "/avatars/annie.jpg" },
  { name: "Tom", avatar: "/avatars/tom.jpg" },
];

const trendingTags = ["#quickmeal", "#vegan", "#lowcarb", "#highprotein"];

const recentPosts = [
  { id: "1", title: "Top 5 salad ideas", author: "Annie" },
  { id: "2", title: "My 15-min meal plan", author: "Tom" },
];

const RightSidebar = () => {
  return (
    <aside className="w-[250px] hidden xl:block h-full  px-4 py-6 bg-background">
      <div className="space-y-8">
        {/* Notifications or Activity */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
            <Bell className="w-4 h-4" /> Activity
          </h2>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>🍳 New post in Vegan Lovers</li>
            <li>💬 You got 3 new replies</li>
          </ul>
        </div>

        {/* Trending Hashtags */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
            <Hash className="w-4 h-4" /> Trending Hashtags
          </h2>
          <div className="flex flex-col gap-1">
            {trendingTags.map((tag) => (
              <Link
                key={tag}
                to={`/community/hashtag/${tag.replace("#", "")}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Suggested Users */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
            <Users className="w-4 h-4" /> People to follow
          </h2>
          <ul className="space-y-2">
            {recentUsers.map((user, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <button className="text-xs text-blue-500 hover:underline">
                    Follow
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">
            New Posts
          </h2>
          <ul className="text-sm space-y-1">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/community/post/${post.id}`}
                  className="hover:underline text-foreground"
                >
                  {post.title}{" "}
                  <span className="text-muted-foreground">
                    by {post.author}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
