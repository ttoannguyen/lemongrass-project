import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Utensils } from "lucide-react";

const AdminDashboard = () => {
  const stats = {
    users: 2,
    posts: 3,
    recipes: 87,
  };

  const items = [
    { label: "Total Users", value: stats.users, icon: Users, color: "text-blue-500" },
    { label: "Total Posts", value: stats.posts, icon: FileText, color: "text-green-500" },
    { label: "Total Recipes", value: stats.recipes, icon: Utensils, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
