"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function SearchInput() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchBookmark, setSearchBookmark] = useState(search || "");
  const pathname = usePathname();
  const router = useRouter();
  const isArchive = searchParams.get("archive");

  function handleChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;
    setSearchBookmark(searchQuery);
    let newUrl = "";
    if (searchQuery) {
      newUrl = isArchive
        ? `${pathname}?archive=${isArchive}&search=${searchQuery}`
        : `${pathname}?search=${searchQuery}`;
    } else {
      newUrl = isArchive ? `${pathname}?archive=${isArchive}` : `${pathname}`;
    }

    router.replace(newUrl);
  }

  return (
    <div className="relative grow max-w-xs">
      <SearchIcon
        className="absolute top-3 left-2 stroke-muted-foreground"
        size={20}
      />
      <Input
        onChange={handleChangeSearchInput}
        value={searchBookmark}
        id="search"
        placeholder="Search by title..."
        className="pl-8 border-muted"
      />
    </div>
  );
}

export default SearchInput;
