import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/navbar/NavBar";
import SecondNavBar from "@/components/navbar/SecondNavBar";

const Layout = () => {
  const [showSecondNav, setShowSecondNav] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
            setShowSecondNav(false); // scroll down → hide
          } else {
            setShowSecondNav(true); // scroll up → show
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <NavBar />

      <div
        className={`fixed top-17 left-0 right-0 z-30 transition-transform duration-300 bg-background ${
          showSecondNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <SecondNavBar />
      </div>

      <div className="pt-9  mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
