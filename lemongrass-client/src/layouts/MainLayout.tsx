import Navbar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
