import { Post } from "@/types/posts";

export default function WriteTabs({ post }: { post?: Post }) {
  const boardTabs = [
    {
      category: "자유",
    },
    {
      category: "질문",
    },
  ];

  return (
    <ul className="flex gap-3">
      {boardTabs.map((tab) => (
        <li key={tab.category}>
          <label>
            {post ? (
              <input type="radio" name="board-category" value={tab.category} className="peer sr-only" defaultChecked={tab.category === post.category} />
            ) : (
              <input type="radio" name="board-category" value={tab.category} className="peer sr-only" />
            )}
            <span className="block min-w-25 cursor-pointer rounded-sm border border-slate-200 px-4 py-1.5 text-center text-sm peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white peer-not-checked:hover:bg-gray-100">
              {tab.category}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
