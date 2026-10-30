export default function SkeletonBlock({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`block animate-pulse rounded bg-slate-200 ${className}`} />;
}
