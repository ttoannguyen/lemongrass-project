// src/components/BreadcrumbBar.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

const BreadcrumbBar = ({ items }: { items: BreadcrumbItemType[] }) => {
  return (
    <Breadcrumb className="mx-6 py-4 text-sm">
      <BreadcrumbList className="flex items-center gap-x-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link
                    className="capitalize text-paragraph hover:text-headline transition-colors duration-200 hover:underline"
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="capitalize font-semibold text-headline">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {index < items.length - 1 && (
              <BreadcrumbSeparator className="mx-1 text-gray-400">
                /
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
