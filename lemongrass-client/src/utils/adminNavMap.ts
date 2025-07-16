// utils/adminNavMap.ts

import { navSections } from "@/lib/constants/adminNav";

// Flatten navSections into path -> label map
export const adminRouteTitleMap: Record<string, string> = {};

navSections.forEach((section) => {
  section.links.forEach((link) => {
    adminRouteTitleMap[link.path] = link.header;
  });
});
