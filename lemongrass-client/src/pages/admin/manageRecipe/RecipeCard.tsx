"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Recipe = {
  id: string;
  title: string;
  cookingTime: number;
  difficulty: string;
  servings: number;
  ratingAvg: number | null;
  verified: boolean;
  shareCount: number;
  tags: { name: string; color: string }[];
  images: { url: string; displayOrder: number }[];
  accountShortResponse: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string | null;
  };
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const imageUrl = recipe.images[0]?.url;

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  return (
    <Card>
      <CardContent className="flex gap-4 py-2 items-start">
        {/* Image */}
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-44 h-32 object-cover rounded-md flex-shrink-0"
        />

        {/* Info + Actions */}
        <div className="flex justify-between items-start w-full gap-4">
          {/* Info */}
          <div className="flex flex-col justify-start flex-1 gap-1">
            <h2 onClick={handleCardClick} className="font-semibold text-lg">
              {recipe.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              Tác giả: {recipe.accountShortResponse.firstName}{" "}
              {recipe.accountShortResponse.lastName} (
              {recipe.accountShortResponse.username})
            </p>
            <p className="text-sm">
              Thời gian: {recipe.cookingTime} phút | Độ khó: {recipe.difficulty}{" "}
              | Khẩu phần: {recipe.servings}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {recipe.tags.map((tag) => (
                <Badge
                  key={tag.name}
                  style={{ backgroundColor: tag.color }}
                  className="text-white"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2 min-w-max">
            {!recipe.verified && (
              <Badge
                variant="outline"
                className="text-yellow-500 border-yellow-500"
              >
                Chưa duyệt
              </Badge>
            )}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Eye className="size-4" />
              </Button>
              {!recipe.verified && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log("Duyệt công thức:", recipe.id)}
                >
                  <CircleCheck className="size-4 text-green-600" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => console.log("Xóa công thức:", recipe.id)}
              >
                <Trash2 className="size-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
