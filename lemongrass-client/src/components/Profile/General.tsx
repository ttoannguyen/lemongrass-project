import { useParams } from "react-router-dom";
import RecipeItem from "@/components/recipes/RecipeItem";
import { useAccountQuery } from "@/hooks/queries/useAccountQuery";
import { useAccountRecipeQuery } from "@/hooks/queries/useRecipeQuery";
import { Skeleton } from "../ui/skeleton";
import { useAccountPostsQuery } from "@/hooks/queries/usePostQuery";

const General = () => {
  const { accountId: rawAccountId } = useParams<{ accountId?: string }>();
  const accountId = rawAccountId ?? "";
  console.log(accountId);
  const { data: fetchedUser, isLoading } = useAccountQuery(accountId);

  const { data: recipes = [] } = useAccountRecipeQuery(fetchedUser?.id);
  const { data: posts = [] } = useAccountPostsQuery(fetchedUser?.id);

  if (!accountId || isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="w-full h-32 rounded-xl" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8 p-6">
      <section>
        <h2 className="text-xl font-semibold mb-4">Công thức nổi bật</h2>
        {recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Chưa có công thức nào.</p>
        )}
      </section>

      {/* Bài viết gần đây */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Bài viết gần đây</h2>
        {posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div>{post.title}</div>
              //   <PostItemCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Chưa có bài viết nào.</p>
        )}
      </section>
    </div>
  );
};

export default General;
