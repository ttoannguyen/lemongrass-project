import { InputSearch } from "../ui/search";
import { Button } from "../ui/button";
type props = {
  className?: string;
};
const SearchInput = ({ className }: props) => {
  return (
    <div className={`hidden md:flex md:gap-2 relative mr-auto ${className}`}>
      <InputSearch
        type="text"
        placeholder="Search..."
        className="w-full bg-background text-text border border-border rounded-[var(--radius-sm)]  focus:ring-1 focus:border-transparent transition-all"
      />
      <Button className="text-background bg-secondary hover:bg-secondary/90 cursor-pointer">
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
