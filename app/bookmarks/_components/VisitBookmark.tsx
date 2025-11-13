"use client";

import { ExternalLinkIcon } from "lucide-react";
import { visitBookmark } from "../_actions/visitBookmark";
import { useVisitLoading } from "@/app/contexts/visitLoadingContext";

function VisitBookmark({
  url,
  bookmarkId,
}: {
  url: string;
  bookmarkId: string;
}) {
  const { setVisitLoading } = useVisitLoading();

  async function handleClickVisit() {
    try {
      setVisitLoading(true);
      const result = await visitBookmark(bookmarkId);
      if (result?.success) window.location.href = url;
      setVisitLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={handleClickVisit}
      className="flex w-full cursor-pointer items-center gap-2 text-sm font-semibold"
    >
      <ExternalLinkIcon size={16} />
      Visit
    </button>
  );
}

export default VisitBookmark;
