"use client";

import HeroSection from "@/components/hero/hero-section";
import { getBoardConfig } from "@/data/json/board-config";
import { useParams } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function BoardLayout({ children }: Props) {
  const { board } = useParams<{ board: string }>();
  const hero = getBoardConfig(board);

  if (!hero) return null;

  return (
    <>
      <HeroSection>
        <h2 className="text-4xl font-bold mb-5">{hero.name}</h2>
        <p className="mb-2 text-2xl font-semibold">{hero.description}</p>
        <p className="text-sm text-slate-500">모든 글은 익명으로 작성되며 서로를 존중하는 문화를 만들어가요.</p>
      </HeroSection>
      <section className="w-full max-w-300 mx-auto pt-20 pb-30">{children}</section>
    </>
  );
}
