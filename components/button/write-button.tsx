import Link from "next/link";

export default function WriteButton() {
  return (
    <Link href="/write" className="flex items-center justify-center w-25 h-10 rounded-sm bg-black text-white transition-colors hover:bg-[#333]">
      글쓰기
    </Link>
  );
}
