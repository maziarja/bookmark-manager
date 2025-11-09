import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

function CopyUrlBookmark({ url }: { url: string }) {
  function handleCopyUrl() {
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard.", {
      icon: <CopyIcon size={20} />,
    });
  }

  return (
    <a
      href="#"
      onClick={handleCopyUrl}
      className="flex w-full items-center gap-2 text-sm font-semibold"
    >
      <CopyIcon size={16} />
      Copy URL
    </a>
  );
}

export default CopyUrlBookmark;
