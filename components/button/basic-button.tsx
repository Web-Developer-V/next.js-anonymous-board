import Link from "next/link";
import type { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  type?: "link" | "button" | "submit";
  link?: string;
  color?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function BasicButton({ children, type, link, color, disabled, onClick }: Props) {
  const colorCss = color === "white" ? "border border-slate-200 bg-white hover:bg-gray-100" : color === "black" ? "bg-black text-white hover:bg-[#333]" : "bg-black text-white hover:bg-[#333]";

  if (type === "link") {
    return (
      <Link href={link ? link : "/"} className={`inline-flex items-center justify-center min-w-25 h-10 transition-colors ${colorCss}`}>
        {children}
      </Link>
    );
  }

  return (
    <>
      {type === "button" || type === "submit" ? (
        <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center min-w-25 h-10 cursor-pointer transition-colors disabled:cursor-auto disabled:bg-black ${colorCss}`}>
          {children}
        </button>
      ) : (
        <button onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center min-w-25 h-10 cursor-pointer transition-colors disabled:cursor-auto disabled:bg-black ${colorCss}`}>
          {children}
        </button>
      )}
    </>
  );
}
