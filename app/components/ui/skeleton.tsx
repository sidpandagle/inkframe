import { cn } from "~/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="card-modern border border-border rounded-xl p-6">
      <div className="space-y-4">
        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Title */}
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />

        {/* Summary */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ComplianceCardSkeleton() {
  return (
    <div className="border border-border rounded-xl p-6">
      <div className="space-y-4">
        {/* Title */}
        <Skeleton className="h-7 w-3/4" />

        {/* Article count */}
        <Skeleton className="h-4 w-24" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function ArticleDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Skeleton className="h-10 w-36 mb-8" />

      {/* Article header */}
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="h-12 w-3/4 mb-6" />

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        </header>

        {/* Summary */}
        <Skeleton className="h-24 w-full mb-8" />

        {/* Content */}
        <div className="space-y-4 mb-12">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="py-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </article>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <div className="py-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
