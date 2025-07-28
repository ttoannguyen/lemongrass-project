import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { InputSearch } from "../ui/search";
// import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
type props = {
  className?: string;
};
const SearchInput = ({ className }: props) => {
  const {t} = useTranslation()
  return (
    <div className={`hidden md:flex w-full mr-20 ${className}`}>
      <Button
        type="button"
        className="h-10 px-3 rounded-r-none rounded-l-[var(--radius-sm)] bg-headline text-main border border-headline border-r-0 hover:text-main"
      >
        <Search className="w-4 h-4" />
      </Button>
      <InputSearch
        type="text"
        placeholder={t(TRANSLATION_KEYS.navigation.searchPlaceholder)}
        className="w-full h-10 bg-main! text-paragraph border border-headline! rounded-r"
      />
    </div>
  );
};

export default SearchInput;
