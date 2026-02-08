"use client";

import Image from "next/image";
import useSearchQuery from "@/hooks/search/useSearchQuery";
import useSearchBooks from "@/hooks/search/useSearchBooks";

export default function SearchPage() {
  const { keyword } = useSearchQuery();
  const { books, loading, error } = useSearchBooks(keyword);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">「{keyword}」の検索結果</h1>

      {loading && <p>検索中...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && books.length === 0 && keyword && (
        <p>検索結果が見つかりませんでした</p>
      )}

      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="flex gap-4 rounded border p-4">
            {book.thumbnail ? (
              <Image
                src={book.thumbnail}
                alt={book.title}
                width={128}
                height={192}
                unoptimized
                className="h-auto w-32 shrink-0 object-contain"
              />
            ) : (
              <div className="bg-muted flex h-48 w-32 shrink-0 items-center justify-center rounded">
                <span className="text-muted-foreground text-sm">No Image</span>
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold">{book.title}</h2>
              {book.authors && (
                <p className="text-muted-foreground text-sm">
                  {book.authors.join(", ")}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
