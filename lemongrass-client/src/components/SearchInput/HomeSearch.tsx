import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";

const HomeSearch = () => {
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();

  return (
    <>
      <Input
        placeholder={t(TRANSLATION_KEYS.recipe.find)}
        onFocus={() => setOpen(true)}
        className="w-full h-10 font-bold bg-main text-paragraph border border-headline rounded"
        readOnly
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="p-0 bg-white rounded-xl shadow-xl overflow-hidden  max-w-2xl min-h-[420px]  md:min-w-[600px]
                     top-[10%] sm:top-[40%] translate-y-0"
        >
          {/* Thanh tìm kiếm */}
          <div className="p-4 border-b flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search recipes"
              autoFocus
              className="border-none! focus:ring-0! focus:ring-offset-0! shadow-none!"
            />
            <div className="ml-auto text-xs text-paragraph px-2 py-1 border border-stroke/20 rounded">
              esc
            </div>
          </div>

          {/* Nội dung */}
          <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
            No recent searches
          </div>

          {/* Footer */}
          <div className="px-4 py-2 text-xs text-right text-gray-400 border-t">
            Search by Algolia
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HomeSearch;
