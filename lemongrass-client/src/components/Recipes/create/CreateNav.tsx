import { Button } from "@/components/ui/button";
import { Eye, Upload } from "lucide-react";

const CreateNav = () => {
  return (
    <div className="relative flex items-center h-16 px-4 bg-white">
      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
        CreateNav
      </h1>
      <div className="ml-auto flex gap-2">
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          See preview
        </Button>
        <Button size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Publish Recipe
        </Button>
      </div>
    </div>
  );
};

export default CreateNav;
