import HeroSection from "@/components/hero/hero-section";
import WriteButton from "@/components/button/write-button";
import MainSection from "@/components/main-section";

export default function Home() {
  return (
    <>
      <HeroSection>
        <p className="mb-2 text-3xl font-semibold">게시글을 자유롭게 작성하고 질문해보세요.</p>
        <p className="text-sm text-slate-500 mb-3">모든 글은 익명으로 작성되며 서로를 존중하는 문화를 만들어가요.</p>
        <WriteButton />
      </HeroSection>

      <MainSection />
    </>
  );
}
