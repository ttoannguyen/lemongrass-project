"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  //   SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleCheck, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PostResponse } from "@/types/post/PostResponse";

const PostCard = ({ post }: { post: PostResponse }) => {
  const navigate = useNavigate();

  const handleViewOriginal = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <Card>
      <CardContent className="flex gap-4 py-3 items-start">
        <div className="flex flex-col justify-start flex-1 gap-1">
          <Sheet>
            <SheetTrigger asChild>
              <h2 className="font-semibold text-lg cursor-pointer hover:underline">
                {post.title}
              </h2>
            </SheetTrigger>
            <SheetContent>
              {/* <SheetHeader> */}

              {/* </SheetHeader> */}
              <div className="mt-4 grid gap-3">
                <p>
                  <strong>Tác giả:</strong>{" "}
                  {post.accountShortResponse?.firstName}{" "}
                  {post.accountShortResponse?.lastName}
                </p>
                <p>
                  <strong>Ngày đăng:</strong>{" "}
                  {new Date(post.createdDate).toLocaleDateString()}
                </p>
                {/* <p>{post.content}</p> */}
              </div>
              <SheetTitle>{post.title}</SheetTitle>
              <SheetDescription>{post.content}</SheetDescription>
              <SheetFooter className="mt-4">
                <SheetClose asChild>
                  <Button variant="outline">Đóng</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <p className="text-sm text-muted-foreground">
            {post.accountShortResponse?.firstName}{" "}
            {post.accountShortResponse?.lastName}
          </p>
          <p className="text-sm italic text-muted-foreground">
            {new Date(post.createdDate).toLocaleDateString()}
          </p>
          <p
            onClick={handleViewOriginal}
            className="cursor-pointer hover:underline"
          >
            Xem bài gốc...
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 min-w-max">
          {!post.isVerified ? (
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
            {!post.isVerified && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => console.log("Duyệt bài viết:", post.id)}
              >
                <CircleCheck className="size-4 text-green-600" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Xóa bài viết:", post.id)}
            >
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
