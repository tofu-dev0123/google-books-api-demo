import { NextRequest, NextResponse } from "next/server";
import { type GoogleBooksResponse, toBooks } from "@/types/book";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q) {
    return NextResponse.json(
      { error: "検索キーワードが指定されていません" },
      { status: 400 },
    );
  }

  const url = new URL(GOOGLE_BOOKS_API_URL);
  url.searchParams.set("q", q);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  if (apiKey) {
    url.searchParams.set("key", apiKey);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    return NextResponse.json(
      { error: "Google Books API へのリクエストに失敗しました" },
      { status: res.status },
    );
  }

  const data: GoogleBooksResponse = await res.json();
  const books = toBooks(data);

  return NextResponse.json(books);
}
