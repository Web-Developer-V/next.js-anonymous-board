"use client";

import ReactPaginate from "react-paginate";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPage: number;
}

export default function PostsPagination({ currentPage, totalPage }: Props) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <ReactPaginate
      pageCount={totalPage}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => {
        router.push(`${pathName}?page=${selected + 1}`);
      }}
      previousLabel={<ChevronLeft size={20} />}
      nextLabel={<ChevronRight size={20} />}
      breakLabel="..."
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName="mx-auto flex w-full items-center justify-center gap-2 mt-8"
      pageClassName="flex items-center"
      pageLinkClassName="group/button inline-flex size-9 items-center justify-center rounded-4xl border border-transparent text-sm font-medium whitespace-nowrap transition-all cursor-pointer hover:bg-muted hover:text-foreground"
      activeLinkClassName="border-border bg-input/30 hover:bg-input/50 hover:text-foreground"
      previousClassName="flex items-center"
      previousLinkClassName="group/button inline-flex size-9 items-center justify-center gap-1.5 rounded-4xl border border-transparent text-sm font-medium whitespace-nowrap transition-all cursor-pointer hover:bg-muted hover:text-foreground"
      nextClassName="flex items-center"
      nextLinkClassName="group/button inline-flex size-9 items-center justify-center gap-1.5 rounded-4xl border border-transparent text-sm font-medium whitespace-nowrap transition-all cursor-pointer hover:bg-muted hover:text-foreground"
      breakClassName="flex size-9 items-center justify-center"
      disabledClassName="pointer-events-none opacity-50"
    />
  );
}
