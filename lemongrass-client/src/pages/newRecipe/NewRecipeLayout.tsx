import { Outlet } from "react-router-dom";

const NewRecipeLayout = () => {
  return (
    <div className="">
      {/* <NewRecipeHeader /> */}
      <Outlet />
    </div>
  );
};

export default NewRecipeLayout;
