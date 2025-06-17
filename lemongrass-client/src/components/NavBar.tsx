import { ModeToggle } from "./mode-toggle";

const NavBar = () => {
  return (
    <div className="py-2 bg-white dark:bg-black h-20 w-full shadow">
      <ModeToggle />
    </div>
  );
};

export default NavBar;
