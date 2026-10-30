"use client";

import { useRouter } from "next/navigation";
import BasicButton from "./basic-button";

interface Props {
  pathName?: string;
  page: number;
}

export default function ListBackButton({ pathName, page }: Props) {
  const router = useRouter();
  const currentPage = Math.max(1, Number(page) || 1);

  return (
    <BasicButton type="button" onClick={() => router.push(`/${pathName}?page=${currentPage}`)} color="white">
      목록으로
    </BasicButton>
  );
}
