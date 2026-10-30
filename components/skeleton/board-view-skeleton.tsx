import SkeletonBlock from "./skeleton-block";

export default function BoardViewSkeleton() {
  return (
    <section className="border border-gray-200 rounded-xl">
      <div className="flex flex-col gap-y-2 p-7 border-b border-gray-200">
        <SkeletonBlock className="h-3 w-16" />
        <SkeletonBlock className="h-8 w-2/3" />
        <div className="flex gap-4 pt-1"><SkeletonBlock className="h-3 w-14" /><SkeletonBlock className="h-3 w-24" /><SkeletonBlock className="h-3 w-16" /><SkeletonBlock className="h-3 w-20" /></div>
      </div>
      <div className="p-7">
        <div className="flex flex-col gap-y-3 mb-10 min-h-60"><SkeletonBlock className="h-4 w-full" /><SkeletonBlock className="h-4 w-11/12" /><SkeletonBlock className="h-4 w-4/5" /><SkeletonBlock className="h-4 w-10/12" /><SkeletonBlock className="h-4 w-2/3" /></div>
        <SkeletonBlock className="mx-auto h-10 w-20 rounded-full" />
        <div className="flex justify-between gap-4 py-7 mt-8 border-y border-gray-200"><SkeletonBlock className="h-10 w-25" /><div className="flex gap-2"><SkeletonBlock className="h-10 w-25" /><SkeletonBlock className="h-10 w-25" /></div></div>
        <div className="mt-5"><SkeletonBlock className="h-5 w-24" /><div className="mt-3 border-y border-black">{[0, 1].map((comment) => <div key={comment} className="flex flex-col gap-y-3 p-5 border-b last:border-0 border-gray-200"><div className="flex gap-2"><SkeletonBlock className="h-4 w-10" /><SkeletonBlock className="h-4 w-28" /></div><SkeletonBlock className="h-4 w-4/5" /><SkeletonBlock className="h-3 w-16" /></div>)}</div><SkeletonBlock className="h-24 w-full mt-5 rounded-md" /></div>
      </div>
    </section>
  );
}
