import SkeletonBlock from "./skeleton-block";

export default function EditFormSkeleton({ type }: { type: "tab" | "input" | "editor" }) {
  return (
    <>
      {type === "tab" ? (
        <div className="flex gap-3">
          <SkeletonBlock className="min-w-25 h-8 rounded-md border border-slate-200" />
          <SkeletonBlock className="min-w-25 h-8 rounded-md border border-slate-200" />
        </div>
      ) : (
        <SkeletonBlock className={`w-full rounded-md border border-slate-200 ${type === "editor" ? "h-80" : "h-8"}`} />
      )}
    </>
  );
}
