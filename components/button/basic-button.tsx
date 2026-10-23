import Link from "next/link";

interface Props {
  children: React.ReactNode;
  type?: string;
  link?: string;
  color?: string;
}

export default function BasicButton({ children, type, link, color }: Props) {
  const colorCss = color === "white" ? "border border-slate-200 bg-white hover:bg-gray-100" : color === "black" ? "bg-black text-white hover:bg-[#333]" : "bg-black text-white hover:bg-[#333]";

  return (
    <>
      {type === "link" ? (
        <Link href={link ? link : "/"} className={`inline-flex items-center justify-center min-w-25 h-10 transition-colors ${colorCss}`}>
          {children}
        </Link>
      ) : type === "button" ? (
        <button className={`inline-flex items-center justify-center min-w-25 h-10 cursor-pointer transition-colors ${colorCss}`}>{children}</button>
      ) : (
        <button className={`inline-flex items-center justify-center min-w-25 h-10 cursor-pointer transition-colors ${colorCss}`}>{children}</button>
      )}
    </>
  );
}
