import { useEffect, useState } from "react";
import { type Book } from "@/types/book";

export default function useSearchBooks(keyword: string) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword) {
      setBooks([]);
      return;
    }

    const controller = new AbortController();

    async function fetchBooks() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/books/search?q=${encodeURIComponent(keyword)}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error("検索に失敗しました");
        }

        const data: Book[] = await res.json();
        setBooks(data);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        setError(
          e instanceof Error ? e.message : "予期しないエラーが発生しました",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, [keyword]);

  return { books, loading, error };
}
