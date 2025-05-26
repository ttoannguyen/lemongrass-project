import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home";
// import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
// const HomePage = lazy(() => import("../pages/Home"));
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
];

export default routes;
