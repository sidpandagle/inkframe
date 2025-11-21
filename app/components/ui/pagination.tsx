import { Link } from "react-router";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "~/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          to={`${baseUrl}?page=${currentPage - 1}`}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border opacity-50 cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <div
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-10 h-10"
              >
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <Link
              key={pageNumber}
              to={`${baseUrl}?page=${pageNumber}`}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg border transition-colors font-medium text-sm",
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-muted"
              )}
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          to={`${baseUrl}?page=${currentPage + 1}`}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border opacity-50 cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
}

export function PaginationInfo({
  currentPage,
  pageSize,
  totalItems,
  className,
}: {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  className?: string;
}) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Showing <span className="font-medium text-foreground">{start}</span> to{" "}
      <span className="font-medium text-foreground">{end}</span> of{" "}
      <span className="font-medium text-foreground">{totalItems}</span> results
    </p>
  );
}
