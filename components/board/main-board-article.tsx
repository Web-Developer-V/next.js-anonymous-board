import Link from "next/link";
import { useListStore } from "@/store/list-store";

interface Props {
  title: string;
  link: string;
}

export default function MainBoardArticle({ title, link }: Props) {
  const posts = useListStore((state) => state.lists);
  const matchedLists = posts.filter((post) => post.category === title);

  const filteredData = [...matchedLists].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);

  return (
    <article>
      <div className="flex items-center justify-between rounded-t-xl bg-black py-3 px-5">
        <p className="text-white font-bold">{title}</p>
        <Link href={link} className="text-sm text-gray-300 transition-colors hover:text-white">
          더보기
        </Link>
      </div>
      <ul className="px-5 py-3 border border-slate-200 rounded-b-xl">
        {filteredData.map((list) => {
          const time = list.created_at.slice(0, 10);
          return (
            <li key={list.id} className="border-t border-slate-200 first:border-0">
              <Link href={`${link}/${list.id}`} className="flex items-center py-2 transition-colors hover:bg-[#f8f9fb]">
                <time className="min-w-22 text-sm text-slate-400" dateTime={list.created_at}>
                  {time}
                </time>
                <h4>{list.title}</h4>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
