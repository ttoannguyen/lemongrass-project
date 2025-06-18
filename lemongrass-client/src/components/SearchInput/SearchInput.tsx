import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = () => {
  return (
    <div className="relative w-64">
      <span
        onClick={() => console.log("hello")}
        className="absolute inset-y-0 left-0 flex items-center w-10 bg-card border-t border-b border-l border-border rounded-tl-[var(--radius-sm)] rounded-bl-[var(--radius-sm)] text-text cursor-pointer z-10 hover:bg-primary hover:text-background transition-colors"
      >
        <Search className="h-4 w-4 mx-auto" />
      </span>
      <Input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 bg-background text-text border border-border rounded-[var(--radius-sm)]  focus:ring-2 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SearchInput;
