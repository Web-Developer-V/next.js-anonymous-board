interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string;
}

export default function Textarea({ height, ...props }: Props) {
  return <textarea {...props} style={{ minHeight: height }} className="block w-full p-2 text-sm resize-none outline-0 border border-slate-200 bg-white" />;
}
