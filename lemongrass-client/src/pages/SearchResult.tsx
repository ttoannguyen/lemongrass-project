/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<{
    recipes: any[];
    groups: any[];
    users: any[];
    posts: any[];
  }>({
    recipes: [],
    groups: [],
    users: [],
    posts: [],
  });

  useEffect(() => {
    // Dữ liệu giả lập:
    const fakeResult = {
      recipes: [
        { id: 1, title: "Pasta Carbonara", image: "/pasta.jpg" },
        { id: 2, title: "Phở bò truyền thống", image: "/pho.jpg" },
      ],
      groups: [
        { id: 1, name: "Italian Cuisine", memberCount: 132 },
        { id: 2, name: "Ẩm thực Việt", memberCount: 542 },
      ],
      users: [
        { id: 1, name: "chefjohn", avatar: "/avatar.png" },
        { id: 2, name: "foodlover99", avatar: "/avatar2.png" },
      ],
      posts: [
        {
          id: 1,
          title: "Hành trình học nấu phở",
          content:
            "Mình bắt đầu học nấu phở từ bà ngoại. Đây là một hành trình rất thú vị...",
          author: "pholover",
          createdAt: "2025-07-10",
        },
        {
          id: 2,
          title: "Tips nấu món Ý ngon như đầu bếp",
          content:
            "Sử dụng nguyên liệu tươi và chú ý nhiệt độ là bí quyết thành công.",
          author: "chefjohn",
          createdAt: "2025-06-28",
        },
      ],
    };

    setResults(fakeResult);
  }, [query]);

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kết quả cho: "{query}"</h1>

      {/* Recipes */}
      {results.recipes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Công thức</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Groups */}
      {results.groups.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Nhóm cộng đồng</h2>
          <div className="space-y-2">
            {results.groups.map((group) => (
              <div
                key={group.id}
                className="border p-3 rounded bg-white shadow-sm"
              >
                <h3 className="text-base font-medium">{group.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {group.memberCount} thành viên
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users */}
      {results.users.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Người dùng</h2>
          <div className="space-y-2">
            {results.users.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-base font-medium">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      {results.posts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Bài viết</h2>
          <div className="space-y-4">
            {results.posts.map((post) => (
              <div
                key={post.id}
                className="border p-4 rounded bg-white shadow-sm"
              >
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.content}
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  Viết bởi {post.author} •{" "}
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Không có kết quả */}
      {results.recipes.length === 0 &&
        results.groups.length === 0 &&
        results.users.length === 0 &&
        results.posts.length === 0 && (
          <p className="text-muted-foreground text-center">
            Không tìm thấy kết quả phù hợp.
          </p>
        )}
    </div>
  );
};

export default SearchResultsPage;
