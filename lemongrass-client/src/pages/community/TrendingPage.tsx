// src/pages/community/TrendingPage.tsx
import { TrendingUp } from "lucide-react";

const TrendingPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-headline" />
        <h1 className="text-2xl font-bold">Trending Topics</h1>
      </div>

      {/* Dữ liệu trending mô phỏng */}
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted shadow">
          <h2 className="font-semibold text-xl">#VeganLife</h2>
          <p className="text-muted-foreground text-sm">
            1243 posts · 328 likes today
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted shadow">
          <h2 className="font-semibold text-xl">#QuickDinner</h2>
          <p className="text-muted-foreground text-sm">
            893 posts · 210 likes today
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted shadow">
          <h2 className="font-semibold text-xl">#LowCarb</h2>
          <p className="text-muted-foreground text-sm">
            710 posts · 185 likes today
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
