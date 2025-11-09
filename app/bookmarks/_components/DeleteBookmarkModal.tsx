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

function DeleteBookmarkModal() {
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
          <Button className={buttonVariants({ variant: "destructive" })}>
            Delete Permanently
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default DeleteBookmarkModal;
