interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function CommentEditButton({ children, ...props }: Props) {
  return (
    <button {...props} className="text-sm text-slate-400 cursor-pointer">
      {children}
    </button>
  );
}
