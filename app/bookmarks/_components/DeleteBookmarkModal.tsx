import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteBookmark } from "../_actions/deleteBookmark";

function DeleteBookmarkModal({ bookmarkId }: { bookmarkId: string }) {
  async function handleClickDeleteBookmark() {
    await deleteBookmark(bookmarkId);
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete bookmark</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this bookmark?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-card">Cancel</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            onClick={handleClickDeleteBookmark}
            className={buttonVariants({ variant: "destructive" })}
          >
            Delete Permanently
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default DeleteBookmarkModal;
