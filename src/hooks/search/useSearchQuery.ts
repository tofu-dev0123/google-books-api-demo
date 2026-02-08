import { useSearchParams } from "next/navigation";

export default function useSearchQuery() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  return { keyword };
}
