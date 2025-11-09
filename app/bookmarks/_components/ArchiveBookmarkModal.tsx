import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  bookmarkId: string;
  isArchived: boolean;
};

function ArchiveBookmarkModal({ bookmarkId, isArchived }: Props) {
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
        <AlertDialogAction>
          {isArchived ? "Unarchive" : "Archive"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default ArchiveBookmarkModal;
