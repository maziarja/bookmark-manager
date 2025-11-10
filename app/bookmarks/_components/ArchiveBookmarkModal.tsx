import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { archiveBookmark } from "../_actions/archiveBookmark";
import { toast } from "sonner";
import { ArchiveIcon, RotateCcwIcon } from "lucide-react";

type Props = {
  bookmarkId: string;
  isArchived: boolean;
};

function ArchiveBookmarkModal({ bookmarkId, isArchived }: Props) {
  async function handleClickArchive() {
    const data = { bookmarkId, isArchived };
    const result = await archiveBookmark(data);
    if (result.success) {
      toast(
        <p className="text-sm font-medium">
          Bookmark {isArchived ? "restored." : "archived."}
        </p>,
        {
          icon: isArchived ? (
            <RotateCcwIcon size={20} />
          ) : (
            <ArchiveIcon size={20} />
          ),
        }
      );
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {isArchived ? "Unarchive" : "Archive"} bookmark
        </AlertDialogTitle>
        <AlertDialogDescription>
          {isArchived
            ? "Move this bookmark back to your active list?"
            : "Are you sure you want to archive this bookmark?"}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-card">Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleClickArchive}>
          {isArchived ? "Unarchive" : "Archive"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default ArchiveBookmarkModal;
