import MainBoardArticle from "@/components/main/main-board-article";

export default async function MainSection() {
  return (
    <section className="w-full max-w-300 mx-auto pt-20 pb-30">
      <section className="grid grid-cols-2 gap-3">
        <MainBoardArticle category="자유" link="/free-board" />
        <MainBoardArticle category="질문" link="/qna-board" />
      </section>
    </section>
  );
}
