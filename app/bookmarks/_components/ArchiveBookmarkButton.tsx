import { ArchiveIcon, RotateCcwIcon } from "lucide-react";

type Props = {
  isArchive: boolean;
};

function ArchiveBookmarkButton({ isArchive }: Props) {
  return (
    <div
      role="button"
      className="flex w-full cursor-pointer items-center gap-2 text-sm font-semibold"
    >
      {isArchive ? <RotateCcwIcon size={16} /> : <ArchiveIcon size={16} />}
      {isArchive ? "Unarchive" : "Archive"}
    </div>
  );
}

export default ArchiveBookmarkButton;
