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
    await visitBookmark(bookmarkId);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={handleClickVisit}
      className="flex w-full items-center gap-2 text-sm font-semibold"
    >
      <ExternalLinkIcon size={16} />
      Visit
    </button>
  );
}

export default VisitBookmark;
