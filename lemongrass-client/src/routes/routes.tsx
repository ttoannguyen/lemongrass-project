import CreateRecipe from "@/components/MainFeeds/Recipes/CreateRecipe";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import MyPost from "@/pages/MyPost";
import MyRecipe from "@/pages/MyRecipe";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import { type RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "recipe",
      //   element: <RecipeItem />,
      // },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-post",
        element: (
          <ProtectedRoute>
            <MyPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-recipe",
        element: (
          <ProtectedRoute>
            <MyRecipe />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "create-recipe",
    element: (
      <ProtectedRoute>
        <CreateRecipe />
      </ProtectedRoute>
    ),
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
