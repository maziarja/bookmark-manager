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
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

function DeleteBookmarkModal({ bookmarkId }: { bookmarkId: string }) {
  async function handleClickDeleteBookmark() {
    const result = await deleteBookmark(bookmarkId);

    if (result.success) {
      toast(<p className="text-sm font-medium">Bookmark deleted.</p>, {
        icon: <Trash2Icon size={20} />,
      });
    }
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
