import { ExternalLinkIcon } from "lucide-react";
import { visitBookmark } from "../_actions/visitBookmark";

function VisitBookmark({
  url,
  bookmarkId,
}: {
  url: string;
  bookmarkId: string;
}) {
  async function handleClickVisit() {
    try {
      const result = await visitBookmark(bookmarkId);
      if (result?.success) window.location.href = url;
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
