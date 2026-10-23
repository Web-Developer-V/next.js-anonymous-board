export default function WriteTabs() {
  const boardTabs = [
    {
      category: "자유게시판",
      title: "자유게시판",
    },
    {
      category: "질문게시판",
      title: "질문게시판",
    },
  ];

  return (
    <ul className="flex gap-3">
      {boardTabs.map((tab) => (
        <li key={tab.category}>
          <label>
            <input type="radio" name="board-category" value={tab.category} className="peer sr-only" />
            <span className="block min-w-25 cursor-pointer border border-slate-200 px-4 py-1.5 text-center text-sm rounded-sm transition-colors peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white hover:bg-gray-100">
              {tab.title}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
