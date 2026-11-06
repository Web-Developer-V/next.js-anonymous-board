"use client";

import { createUser } from "@/app/actions/user-action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateUserClient() {
  const router = useRouter();

  useEffect(() => {
    const handleCreateUser = async () => {
      try {
        await createUser();
        router.refresh();
      } catch (error) {
        alert(`익명 사용자 생성 실패 : ${error}`);
      }
    };

    handleCreateUser();
  }, [router]);

  return null;
}
