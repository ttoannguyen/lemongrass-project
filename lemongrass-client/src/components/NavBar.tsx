import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Links } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 shadow backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-green-700">MyApp</div>

          {!isScrolled && !isMobile && (
            <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
              <Link to={"/"} className="hover:text-green-700 cursor-pointer">
                Trang chủ
              </Link>

              <Link
                className="hover:text-green-700 cursor-pointer"
                to={"/about"}
              >
                Giới thiệu
              </Link>

              {/* <li className="hover:text-green-700 cursor-pointer">Dịch vụ</li>
              <li className="hover:text-green-700 cursor-pointer">Liên hệ</li> */}
            </div>
          )}

          {(isScrolled || isMobile) && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-green-700 hover:text-green-900 "
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
      </nav>

      {/* Overlay & Sidebar */}
      <div
        className={`fixed inset-0 z-[999] bg-black/40 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white p-6 shadow-lg z-[1000]
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-green-700">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex flex-col  text-gray-700 font-medium">
            <Link
              to={"/"}
              className="px-2 py-2 hover:text-green-700 hover:bg-green-100 rounded-md cursor-pointer"
            >
              Trang chủ
            </Link>

            <Link
              to={"/about"}
              className="px-2 py-2 hover:text-green-700 hover:bg-green-100 rounded-md cursor-pointer"
            >
              Giới thiệu
            </Link>

            {/* <li className="hover:text-green-700 cursor-pointer">Dịch vụ</li>
              <li className="hover:text-green-700 cursor-pointer">Liên hệ</li> */}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
