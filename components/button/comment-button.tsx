interface Props {
  children: React.ReactNode;
  color?: string;
  width?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CommentButton({ children, color, width, ...props }: Props) {
  const widthCss = width === "auto" ? "w-full" : "min-w-15";
  const colorCss = color === "white" ? "border border-slate-200 bg-white hover:bg-gray-100" : color === "black" ? "bg-black text-white hover:bg-[#333]" : "bg-black text-white hover:bg-[#333]";

  return (
    <button {...props} className={`inline-flex items-center justify-center ${widthCss} h-8 cursor-pointer rounded-sm transition-colors text-sm ${colorCss}`}>
      {children}
    </button>
  );
}
