import SkeletonBlock from "./skeleton-block";

const skeletonRows = Array.from({ length: 10 }, (_, index) => index);

export default function BoardListSkeleton() {
  return (
    <>
      {skeletonRows.map((row) => (
        <tr key={row}>
          <td className="h-12 border-t border-slate-200 px-4">
            <SkeletonBlock className="mx-auto h-3 w-8" />
          </td>
          <td className="border-t border-slate-200 px-4">
            <SkeletonBlock className="h-3 w-3/5" />
          </td>
          <td className="border-t border-slate-200 px-4">
            <SkeletonBlock className="mx-auto h-3 w-12" />
          </td>
          <td className="border-t border-slate-200 px-4">
            <SkeletonBlock className="mx-auto h-3 w-20" />
          </td>
          <td className="border-t border-slate-200 px-4">
            <SkeletonBlock className="mx-auto h-3 w-8" />
          </td>
          <td className="border-t border-slate-200 px-4">
            <SkeletonBlock className="mx-auto h-3 w-8" />
          </td>
        </tr>
      ))}
    </>
  );
}
