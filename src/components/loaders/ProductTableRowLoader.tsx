import { SkeletonLoader } from "./SkeletonLoader";

export function ProductTableRowLoader() {
  return (
    <tr>
      <td className="py-2 px-1"><SkeletonLoader /></td>
      <td className="py-2 px-1"><SkeletonLoader className="w-25 h-25" /></td>
      <td className="py-2 px-1"><SkeletonLoader /></td>
      <td className="py-2 px-1"><SkeletonLoader /></td>
      <td className="py-2 px-1"><SkeletonLoader /></td>
      <td className="py-2 px-1"><SkeletonLoader /></td>
    </tr>
  );
}
