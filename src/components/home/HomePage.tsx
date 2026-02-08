"use client";

import useSearch from "@/hooks/home/useSearch";
import Image from "next/image";

export default function HomePage() {
  const { keyword, handleInputChange, onSearch } = useSearch();

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="border-gray/100 flex h-10 w-120 justify-center rounded-md border px-2">
        <input
          className="flex-1 border-none shadow-none outline-none focus:ring-0 focus:outline-none"
          type="search"
          placeholder="本を検索する"
          value={keyword}
          onChange={(e) => handleInputChange(e)}
        />
        <div className="relative flex h-full w-10 items-center justify-center">
          <Image
            src="/images/search-icon.png"
            alt="検索"
            width={24}
            height={24}
            className="my-auto cursor-pointer hover:opacity-80"
            onClick={onSearch}
          />
        </div>
      </div>
    </main>
  );
}
