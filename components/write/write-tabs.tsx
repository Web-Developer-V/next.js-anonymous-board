import { v4 as uuidv4 } from "uuid";

export default function WriteTabs() {
  const id = uuidv4();
  const boardTabs = [
    {
      id: "free-board",
      title: "자유게시판",
    },
    {
      id: "qna-board",
      title: "질문게시판",
    },
  ];

  return (
    <ul className="flex gap-3">
      {boardTabs.map((tab) => (
        <li key={tab.id}>
          <label>
            <input type="radio" name="board" value={tab.id} className="peer sr-only" />
            <span className="block min-w-25 cursor-pointer border border-slate-200 px-4 py-1.5 text-center text-sm rounded-sm transition-colors peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white hover:bg-gray-100">
              {tab.title}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
