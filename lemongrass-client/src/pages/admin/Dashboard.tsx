import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRoleQuery } from "@/hooks/queries/useRoleQuery";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { data: roles } = useRoleQuery();
  console.log(roles);
  // Fake data – sau này có thể lấy từ API
  const stats = {
    users: 342,
    posts: 128,
    recipes: 87,
    pendingPosts: 5,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{stats.users}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Posts</p>
            <p className="text-2xl font-bold">{stats.posts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Recipes</p>
            <p className="text-2xl font-bold">{stats.recipes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Posts</p>
            <p className="text-2xl font-bold text-red-500">
              {stats.pendingPosts}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate("/admin/users")}
        >
          👥 Quản lý người dùng
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate("/admin/posts")}
        >
          📝 Quản lý bài viết
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate("/admin/recipes")}
        >
          🍽️ Quản lý công thức
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
