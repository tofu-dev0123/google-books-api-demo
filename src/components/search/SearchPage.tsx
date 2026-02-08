"use client";

import useSearchQuery from "@/hooks/search/useSearchQuery";

export default function SearchPage() {
  const { keyword } = useSearchQuery();

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <p>{keyword}</p>
    </main>
  );
}
