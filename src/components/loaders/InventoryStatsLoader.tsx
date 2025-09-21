import { SkeletonLoader } from "./SkeletonLoader";

export function InventoryStatsLoader() {
  return (
    <div className="flex flex-col gap-1 card">
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </div>
  );
}
