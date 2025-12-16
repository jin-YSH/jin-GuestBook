"use client";

import { useEffect, useState } from "react";

type GuestbookItem = {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [list, setList] = useState<GuestbookItem[]>([]);

  // 방명록 목록 조회
  const fetchGuestbook = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/guestbooks", {
        cache: "no-store", // Next.js 캐싱 방지
      });
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error("방명록 조회 실패:", error);
    }
  };

  // 처음 페이지 로딩 시 실행
  useEffect(() => {
    fetchGuestbook();
  }, []);

  // list 업데이트 시 확인용
  useEffect(() => {
    console.log("응답 데이터 확인:", list);
  }, [list]);

  // 방명록 등록
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nickname.trim() || !content.trim()) return;

    try {
      await fetch("http://localhost:8080/api/guestbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, content }),
      });

      setNickname("");
      setContent("");
      fetchGuestbook(); // 등록 후 다시 조회
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="mx-auto max-w-md rounded bg-white p-4 shadow">
        <h1 className="mb-4 text-xl font-bold text-black">방명록</h1>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="flex-1 rounded border border-gray-300 p-2 text-black"
            placeholder="닉네임"
          />
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 rounded border border-gray-300 p-2 text-black"
            placeholder="내용"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 text-white hover:bg-blue-600 transition-colors"
          >
            등록
          </button>
        </form>

        {/* 리스트 */}
        <ul className="space-y-2">
          {list.map((item) => (
            <li
              key={item.id}
              className="rounded border border-gray-300 bg-gray-50 p-2"
            >
              <div className="text-sm font-bold text-black">
                {item.nickname}
              </div>
              <div className="text-black">{item.content}</div>
              <div className="text-xs text-gray-500">{item.createdAt}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
