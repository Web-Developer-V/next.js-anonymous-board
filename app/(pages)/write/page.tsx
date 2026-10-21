import WriteForm from "@/components/write/write-form";
import WriteTabs from "@/components/write/write-tabs";

export default function WritePage() {
  return (
    <section className="w-full max-w-150 mx-auto py-20">
      <div className="mb-7">
        <h2 className="mb-2 text-3xl font-bold">글쓰기</h2>
        <p>여러분의 소중한 생각을 자유롭게 작성해주세요.</p>
      </div>

      <div className="mb-8">
        <h3 className="mb-2 font-semibold">게시판 선택</h3>
        <WriteTabs />
      </div>

      <WriteForm />
    </section>
  );
}
