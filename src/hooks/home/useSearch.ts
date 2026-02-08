import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSearch = () => {
    router.push("/search");
  };

  return { keyword, handleInputChange, onSearch };
}
