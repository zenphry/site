import { Link } from "react-router";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">&rsaquo;</span>}
            {isLast || !item.href ? (
              <span className={isLast ? "text-white font-medium" : ""}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-primary hover:underline underline-offset-2 transition-colors duration-150"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
