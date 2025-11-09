import { ExternalLinkIcon } from "lucide-react";

function VisitBookmark({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      className="flex w-full items-center gap-2 text-sm font-semibold"
    >
      <ExternalLinkIcon size={16} />
      Visit
    </a>
  );
}

export default VisitBookmark;
