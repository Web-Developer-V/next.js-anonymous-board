import MainBoardArticle from "@/components/board/main-board-article";
import HeroSection from "@/components/hero/hero-section";
import FREE_BOARD_LIST from "../data/json/free-board.json";
import QNA_BOARD_LIST from "../data/json/qna-board.json";
import WriteButton from "@/components/button/write-button";

export default function Home() {
  return (
    <>
      <HeroSection>
        <p className="mb-2 text-3xl font-semibold">게시글을 자유롭게 작성하고 질문해보세요.</p>
        <p className="text-sm text-slate-500 mb-3">모든 글은 익명으로 작성되며 서로를 존중하는 문화를 만들어가요.</p>
        <WriteButton />
      </HeroSection>
      <main>
        <section className="grid grid-cols-2 gap-3 max-w-300 mx-auto">
          <MainBoardArticle title="자유게시판" link="/free-board" data={FREE_BOARD_LIST} />
          <MainBoardArticle title="질문게시판" link="/qna-board" data={QNA_BOARD_LIST} />
        </section>
      </main>
    </>
  );
}
