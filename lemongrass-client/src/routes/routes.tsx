import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
