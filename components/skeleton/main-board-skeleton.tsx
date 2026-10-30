import SkeletonBlock from "./skeleton-block";

export default function MainBoardSkeleton() {
  return (
    <ul>
      {[0, 1, 2, 3, 4].map((row) => (
        <li key={row} className="border-t border-slate-200 first:border-0">
          <div className="flex gap-x-3 items-center py-2">
            <SkeletonBlock className="min-w-22 h-4 w-20" />
            <SkeletonBlock className="h-4 w-3/5" />
          </div>
        </li>
      ))}
    </ul>
  );
}
