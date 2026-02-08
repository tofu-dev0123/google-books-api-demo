"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="border-gray/100 rounded-md flex h-10 w-120 px-2 border justify-center">
        <input className="border-none shadow-none outline-none focus:outline-none focus:ring-0 flex-1" type="search" placeholder="本を検索する" />
        <div className="w-10 h-full relative flex items-center justify-center opacity-50">
        <Image
          src="/images/search-icon.png"
          alt="検索"
          width={24}
          height={24}
          className="my-auto"
        />
        </div>
      </div>
    </main>
  );
}
