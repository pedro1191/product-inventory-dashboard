interface SkeletonLoaderProps {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div className={`flex h-7 animate-pulse space-x-4 ${className ?? ''}`}>
      <div className="flex-1 h-full rounded bg-gray-200"></div>
    </div>
  );
}
