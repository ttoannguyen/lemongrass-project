"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleCheck, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";

// type Recipe = {
//   id: string;
//   title: string;
//   cookingTime: number;
//   difficulty: string;
//   servings: number;
//   ratingAvg: number | null;
//   verified: boolean;
//   shareCount: number;
//   tags: { name: string; color: string }[];
//   images: { url: string; displayOrder: number }[];
//   accountShortResponse: {
//     id: string;
//     username: string;
//     firstName: string;
//     lastName: string;
//     profilePictureUrl: string | null;
//   };
// };

const RecipeCard = ({ recipe }: { recipe: RecipeResponse }) => {
  const imageUrl = recipe.images[0]?.url;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Card>
      <CardContent className="flex gap-4 py-2 items-start">
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-44 h-32 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex justify-between items-start w-full gap-4">
          <div className="flex flex-col justify-start flex-1 gap-1">
            <Sheet>
              <SheetTrigger asChild>
                {/* <Button variant="ghost" size="icon"> */}
                {/* <Eye className="size-4" /> */}
                <h2 className="font-semibold text-lg cursor-pointer hover:underline">
                  {recipe.title}
                </h2>
                {/* </Button> */}
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{recipe.title}</SheetTitle>
                  <SheetDescription>
                    Thông tin chi tiết về công thức.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-3 mt-4">
                  <img
                    src={imageUrl}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <p>
                    <strong>Tác giả:</strong>{" "}
                    {recipe.accountShortResponse.firstName}{" "}
                    {recipe.accountShortResponse.lastName} (
                    {recipe.accountShortResponse.username})
                  </p>
                  <p>
                    <strong>Thời gian:</strong> {recipe.cookingTime} phút
                  </p>
                  <p>
                    <strong>Độ khó:</strong> {recipe.difficulty}
                  </p>
                  <p>
                    <strong>Khẩu phần:</strong> {recipe.servings}
                  </p>
                  <p>
                    <strong>Tags:</strong>{" "}
                    {recipe.tags.map((tag) => tag.name).join(", ")}
                  </p>
                </div>
                <SheetFooter className="mt-4">
                  <SheetClose asChild>
                    <Button variant="outline">Đóng</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <p className="text-sm text-muted-foreground">
              Tác giả: {recipe.accountShortResponse.firstName}{" "}
              {recipe.accountShortResponse.lastName} (
              {recipe.accountShortResponse.username})
            </p>
            <p className="text-sm">
              Thời gian: {recipe.cookingTime} phút | Độ khó: {recipe.difficulty}{" "}
              | Khẩu phần: {recipe.servings}
            </p>
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
            <p
              onClick={handleCardClick}
              className="cursor-pointer hover:underline"
            >
              Xem bài gốc...
            </p>
          </div>

          {/* Actions with Sheet */}
          <div className="flex flex-col items-end gap-2 min-w-max">
            {!recipe.verified ? (
              <Badge
                variant="outline"
                className="text-yellow-500 border-yellow-500"
              >
                Chưa duyệt
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-green-500 border-green-500"
              >
                Đã duyệt
              </Badge>
            )}
            <div className="flex gap-2">
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
