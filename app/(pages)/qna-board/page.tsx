import HeroSection from "@/components/hero/hero-section";

export default function QnaBoardPage() {
  return (
    <>
      <HeroSection>
        <h2 className="text-4xl font-bold mb-5">질문게시판</h2>
        <p className="mb-2 text-2xl font-semibold">익명으로 질문을 남겨보세요.</p>
        <p className="text-sm text-slate-500">모든 글은 익명으로 작성되며 서로를 존중하는 문화를 만들어가요.</p>
      </HeroSection>
    </>
  );
}
