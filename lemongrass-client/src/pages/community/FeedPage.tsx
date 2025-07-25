import { useEffect, useState } from "react";
import PostComposer from "@/components/community/PostComposer";
import PostCard from "@/components/community/PostCard";
import { type PostResponse } from "@/types/post/PostResponse";

const FeedPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);

  // Dữ liệu giả
  useEffect(() => {
    const fakePosts: PostResponse[] = [
      {
        id: "1",
        author: {
          id: "101",
          username: "Nguyen Van A",
          profilePictureUrl: "/avatars/user1.png",
          email: "",
          firstName: "",
          lastName: "",
          inactive: false,
          bio: "",
          roles: [],
          createdBy: "",
          createdDate: "",
          lastModifiedBy: "",
          lastModifiedDate: "",
          deleted: false,
        },
        content: "Hôm nay mình vừa thử món Bánh Xèo chay, ngon tuyệt!",
        createdDate: "2025-07-25T08:30:00",
        images: [
          {
            url: "/src/assets/images/flat-lay-corn-with-potatoes-tomatoes.jpg",
          },
        ],
        likeCount: 12,
        commentCount: 4,
        title: "",
        visibility: "PUBLIC",
        group: undefined,
        recipe: undefined,
        createdBy: "",
        lastModifiedBy: "",
        lastModifiedDate: "",
        approved: false,
        isVerified: null,
      },
      {
        id: "2",
        author: {
          id: "102",
          username: "Nguyen Van B",
          profilePictureUrl: "/avatars/user2.png",
          email: "",
          firstName: "",
          lastName: "",
          inactive: false,
          bio: "",
          roles: [],
          createdBy: "",
          createdDate: "",
          lastModifiedBy: "",
          lastModifiedDate: "",
          deleted: false,
        },
        content: "Ai có công thức nấu bò kho chuẩn miền Nam không ạ?",
        createdDate: "2025-07-24T14:00:00",
        likeCount: 7,
        commentCount: 3,
        title: "",
        visibility: "PUBLIC",
        images: [
          {
            url: "/src/assets/images/flat-lay-corn-with-potatoes-tomatoes.jpg",
          },
        ],
        group: undefined,
        recipe: undefined,
        createdBy: "",
        lastModifiedBy: "",
        lastModifiedDate: "",
        approved: false,
        isVerified: null,
      },
    ];

    setPosts(fakePosts);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <PostComposer />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <p className="text-muted-foreground text-center">
          Không có bài viết nào.
        </p>
      )}
    </div>
  );
};

export default FeedPage;
