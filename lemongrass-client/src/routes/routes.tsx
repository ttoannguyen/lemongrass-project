import RecipeDetailPage from "@/components/recipes/detail/RecipeDetailPage";
import { wrapProtected, wrapRole } from "@/lib/utils";

import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import MyPost from "@/pages/MyPost";
import MyRecipe from "@/pages/MyRecipe";
import Register from "@/pages/Register";

import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import ManageUsers from "@/pages/admin/ManageUsers";
import ManagePosts from "@/pages/admin/managePost/ManagePosts";
import ManageRecipes from "@/pages/admin/manageRecipe/ManageRecipes";

import { Navigate, type RouteObject } from "react-router-dom";
import StaffLayout from "@/pages/staff/StaffLayout";
import ManageStaffWork from "@/pages/staff/ManageStaffWork";
import ReportedContentList from "@/components/staff/ReportedContentList";
import StaffDashboard from "@/pages/staff/StaffDashboard";
import ManageRolesAndPermissions from "@/pages/admin/manageRolePermission/ManageRolesAndPermissions";
import Ingredient from "@/pages/admin/Ingredient";
import Units from "@/pages/admin/Units";
import Tags from "@/pages/admin/Tags";
import Moderation from "@/pages/admin/system/Moderation";
import Setting from "@/pages/admin/system/Setting";
// import PostDetailPage from "@/components/posts/PostDetailPage";
import AccountLayout from "@/pages/account/AccountLayout";
import RecipeLayout from "@/pages/recipe/RecipeLayout";
import RecipePage from "@/pages/recipe/RecipePage";
import AdminRecipeCategoryPage from "@/pages/admin/AdminRecipeCategory";
import RecipeCategory from "@/pages/recipe/RecipeCategory";
import CommunityLayout from "@/pages/community/CommunityLayout";
import FeedPage from "@/pages/community/FeedPage";
import TrendingPage from "@/pages/community/TrendingPage";
import MyGroupsPage from "@/pages/community/MyGroupsPage";
import SearchResultsPage from "@/pages/SearchResult";
import QuickAndEasy from "@/pages/recipe/QuickAndEasy";
import NewRecipeLayout from "@/pages/newRecipe/NewRecipeLayout";
import Create from "@/components/recipes/create/Create";
import Follower from "@/components/profile/Follower";
import Following from "@/components/profile/Following";
import Favorite from "@/components/profile/Favorite";
import { Info } from "lucide-react";
import General from "@/components/profile/General";
import GroupPage from "@/pages/community/groups/GroupPage";
import GroupLayout from "@/pages/community/groups/GroupLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "my-post", element: wrapProtected(<MyPost />) },
      { path: "my-recipe", element: wrapProtected(<MyRecipe />) },
      // { path: "post/:postId", element: <PostDetailPage /> },
      {
        path: "search",
        element: <SearchResultsPage />,
      },
      {
        path: "recipe",
        element: <RecipeLayout />,
        children: [
          { index: true, element: <RecipePage /> },
          { path: ":recipeId", element: <RecipeDetailPage /> },
          { path: "quick-and-easy", element: <QuickAndEasy /> },
          { path: "category", element: <Navigate to="/recipe" replace /> },
          { path: "category/:categoryId", element: <RecipeCategory /> },
        ],
      },

      {
        path: "community",
        element: <CommunityLayout />,
        children: [
          { index: true, element: <FeedPage /> },
          // { path: "group/:groupId", element: <GroupPage /> },
          { path: "trending", element: <TrendingPage /> },
          { path: "my-groups", element: <MyGroupsPage /> },

          {
            path: "group/:groupId",
            element: <GroupLayout />, // layout riêng cho nhóm
            children: [
              { index: true, element: <GroupPage /> },
              // { path: "admin", element: <GroupAdminPage /> },
              // các route khác như /member, /setting,...
            ],
          },
        ],
      },

      {
        path: "account/:accountId",
        element: wrapProtected(<AccountLayout />),
        children: [
          { index: true, element: <General /> },
          { path: "recipe", element: <MyRecipe /> },
          { path: "post", element: <MyPost /> },
          { path: "favorites", element: <Favorite /> },
          { path: "info", element: <Info /> },
          { path: "follower", element: <Follower /> },
          { path: "following", element: <Following /> },
        ],
      },
      {
        path: "account",
        element: wrapProtected(<AccountLayout />),
        children: [],
      },
    ],
  },
  {
    path: "new-recipe",
    element: wrapProtected(<NewRecipeLayout />),
    children: [{ index: true, element: <Create /> }],
  },
  // --- ADMIN Routes ---
  {
    path: "/admin",
    element: wrapRole(<AdminLayout />, ["ADMIN"]),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <ManageUsers /> },
      { path: "posts", element: <ManagePosts /> },
      { path: "recipes", element: <ManageRecipes /> },
      { path: "recipe-categories", element: <AdminRecipeCategoryPage /> },
      { path: "ingredients", element: <Ingredient /> },
      { path: "units", element: <Units /> },
      { path: "tags", element: <Tags /> },

      // He thong
      { path: "moderation", element: <Moderation /> },
      { path: "settings", element: <Setting /> },
      { path: "roles", element: <ManageRolesAndPermissions /> },
    ],
  },
  // --- STAFF Routes ---
  {
    path: "/staff",
    element: wrapRole(<StaffLayout />, ["ADMIN", "STAFF"]),
    children: [
      { index: true, element: <StaffDashboard /> },
      { path: "pending", element: <ManageStaffWork /> },
      { path: "reports", element: <ReportedContentList /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
];

export default routes;
