import { SkeletonLoader } from "./SkeletonLoader";

export function ProductTableCardLoader() {
  return (
    <div className="flex flex-col gap-4 card">
      <SkeletonLoader />
      <SkeletonLoader className="w-10 h-10" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
        <div className="action-buttons">
          <SkeletonLoader className="flex-1" />
          <SkeletonLoader className="flex-1" />
        </div>
      </div>
    </div>
  );
}
