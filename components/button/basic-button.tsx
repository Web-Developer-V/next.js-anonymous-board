import Link from "next/link";

interface Props {
  children: React.ReactNode;
  type?: string;
  link?: string;
}

export default function BasicButton({ children, type, link }: Props) {
  return (
    <>
      {type === "link" ? (
        <Link href={link ? link : "/"} className="inline-flex items-center justify-center min-w-25 h-10 border border-slate-200 transition-colors hover:bg-gray-100">
          {children}
        </Link>
      ) : type === "button" ? (
        <button className="inline-flex items-center justify-center min-w-25 h-10 bg-black text-white cursor-pointer transition-colors hover:bg-[#333]">{children}</button>
      ) : (
        <button className="inline-flex items-center justify-center min-w-25 h-10 bg-black text-white cursor-pointer transition-colors hover:bg-[#333]">{children}</button>
      )}
    </>
  );
}
