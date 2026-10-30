import EditFormLoader from "@/components/form/edit-form-loader";

interface Props {
  params: Promise<{ board: string; id: string }>;
  searchParams: Promise<{ page: number }>;
}

export default async function EditPage({ params, searchParams }: Props) {
  const { board, id } = await params;
  const { page } = await searchParams;

  return (
    <section className="w-full max-w-150 mx-auto">
      <div className="mb-7">
        <h2 className="mb-2 text-3xl font-bold">게시글 수정</h2>
        <p>작성하신 게시글을 수정하실 수 있습니다.</p>
      </div>

      <EditFormLoader id={id} pathName={board} page={page} />
    </section>
  );
}
