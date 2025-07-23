import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-stroke placeholder:text-paragraph/50 focus-visible:border-stroke focus-visible:ring-stroke/50 aria-invalid:ring-tertiary/20 dark:aria-invalid:ring-tertiary/40 aria-invalid:border-tertiary dark:bg-background/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea }
