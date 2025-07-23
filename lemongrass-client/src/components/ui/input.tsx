import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-paragraph placeholder:text-paragraph/50 selection:bg-highlight selection:text-headline dark:bg-background/30 border-stroke flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-[var(--color-paragraph)]",
        "focus-visible:border-stroke focus-visible:ring-stroke/50 focus-visible:ring-[1px]",
        "aria-invalid:ring-tertiary/20 dark:aria-invalid:ring-tertiary/40 aria-invalid:border-tertiary",
        className
      )}
      {...props}
    />
  );
}

export { Input }
