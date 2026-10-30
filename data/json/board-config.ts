export const boardConfig = [
  {
    id: "free-board",
    link: "/free-board",
    name: "자유게시판",
    category: "자유",
    description: "익명으로 자유롭게 하고 싶은 말을 남겨보세요.",
  },
  {
    id: "qna-board",
    link: "/qna-board",
    name: "질문게시판",
    category: "질문",
    description: "익명으로 질문을 남겨보세요.",
  },
] as const;

export function getBoardConfig(boardId: string) {
  return boardConfig.find((board) => board.id === boardId);
}
