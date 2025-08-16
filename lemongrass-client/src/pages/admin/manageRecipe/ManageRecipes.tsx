"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnverifiedRecipeTab from "./UnverifiedRecipeTab";
import VerifiedRecipeTab from "./VerifiedRecipeTab";
const ManageRecipes = () => {
  // const { setPageTitle } = useOutletContext<{
  //   setPageTitle: (title: string) => void;
  // }>();

  // useEffect(() => {
  //   setPageTitle("Quản lý công thức");
  // }, [setPageTitle]);
  return (
    <div className="flex flex-col h-full text-sm">
      <Tabs
        defaultValue="unverified"
        className="flex-1 flex flex-col overflow-hidden gap-0"
      >
        <TabsList className="h-12 flex items-stretch">
          <TabsTrigger
            value="unverified"
            className="rounded-none px-4 h-full flex items-center justify-center data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Chưa duyệt
          </TabsTrigger>
          <TabsTrigger
            value="verified"
            className="rounded-none px-4 h-full flex items-center justify-center data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Đã duyệt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unverified" className="flex-1 overflow-auto p-4">
          <UnverifiedRecipeTab />
        </TabsContent>

        <TabsContent value="verified" className="flex-1 overflow-auto p-4">
          <VerifiedRecipeTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRecipes;
