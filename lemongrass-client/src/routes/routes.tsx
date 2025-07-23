import RecipeDetailPage from "@/components/Recipes/RecipeDetailPage";
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
import ManagePosts from "@/pages/admin/mamagePost/ManagePosts";
import ManageRecipes from "@/pages/admin/manageRecipe/ManageRecipes";

import { type RouteObject } from "react-router-dom";
import StaffLayout from "@/pages/staff/StaffLayout";
import ManageStaffWork from "@/pages/staff/ManageStaffWork";
import ReportedContentList from "@/components/staff/ReportedContentList";
import StaffDashboard from "@/pages/staff/StaffDashboard";
import ManageRolesAndPermissions from "@/pages/admin/ManageRolesAndPermissions";
import RecipeCategory from "@/pages/admin/RecipeCategory";
import Ingredient from "@/pages/admin/Ingredient";
import Units from "@/pages/admin/Units";
import Tags from "@/pages/admin/Tags";
import Moderation from "@/pages/admin/system/Moderation";
import Setting from "@/pages/admin/system/Setting";
import PostDetailPage from "@/components/Posts/PostDetailPage";
import AccountLayout from "@/pages/account/AccountLayout";
import CreateRecipeForm from "@/components/Recipes/CreateRecipe";
import RecipeCategoryListPage from "@/components/Recipes/RecipeCategoryListPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "my-post", element: wrapProtected(<MyPost />) },
      { path: "my-recipe", element: wrapProtected(<MyRecipe />) },
      { path: "post/:postId", element: <PostDetailPage /> },
      { path: "recipe/:recipeId", element: <RecipeDetailPage /> },
      {
        path: "recipe/:recipeId/image/:imageId",
        element: <RecipeDetailPage />,
      },
      {
        path: "recipe/category/:categoryId",
        element: <RecipeCategoryListPage />,
      },
      {
        path: "account/:accountId", // Xem hồ sơ người khác
        element: wrapProtected(<AccountLayout />),
        children: [
          { index: true, element: <MyRecipe /> },
          { path: "post", element: <MyPost /> },
          // { path: "recipe", element: < /> },
        ],
      },
      {
        path: "account",
        element: wrapProtected(<AccountLayout />),
        children: [{ path: "new-recipe", element: <CreateRecipeForm /> }],
      },
    ],
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
      { path: "recipe-categories", element: <RecipeCategory /> },
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
