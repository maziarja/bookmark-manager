import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import VisitBookmark from "./VisitBookmark";
import CopyUrlBookmark from "./CopyUrlBookmark";
import UnpinBookmark from "./UnpinBookmark";
import EditBookmarkButton from "./EditBookmarkButton";
import ArchiveBookmark from "./ArchiveBookmarkButton";
import { Dialog } from "@/components/ui/dialog";
import EditBookmarkModal from "./EditBookmarkModal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import ArchiveBookmarkModal from "./ArchiveBookmarkModal";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import { useState } from "react";
import DeleteBookmarkModal from "./DeleteBookmarkModal";
import { EllipsisVerticalIcon } from "lucide-react";
import { BookmarkType } from "@/lib/types";

type Props = {
  bookmark: BookmarkType;
};

function BookmarkActions({ bookmark }: Props) {
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  return (
    <>
      <Dialog onOpenChange={setOpenEditModal} open={openEditModal}>
        <EditBookmarkModal
          bookmark={bookmark}
          setOpenEditModal={setOpenEditModal}
        />
      </Dialog>
      <AlertDialog onOpenChange={setOpenArchiveModal} open={openArchiveModal}>
        <ArchiveBookmarkModal
          bookmarkId={bookmark._id}
          isArchived={bookmark.isArchived}
        />
      </AlertDialog>

      <AlertDialog onOpenChange={setOpenDeleteModal} open={openDeleteModal}>
        <DeleteBookmarkModal bookmarkId={bookmark._id} />
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon-lg"}
            className="bg-card rounded-xl"
          >
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem>
              <VisitBookmark url={bookmark.url} bookmarkId={bookmark._id} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyUrlBookmark url={bookmark.url} />
            </DropdownMenuItem>
            {!bookmark.isArchived && (
              <DropdownMenuItem>
                <UnpinBookmark
                  bookmarkId={bookmark._id}
                  pinned={bookmark.pinned}
                />
              </DropdownMenuItem>
            )}
            {!bookmark.isArchived && (
              <DropdownMenuItem>
                <EditBookmarkButton setOpenEditModal={setOpenEditModal} />
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => setOpenArchiveModal(true)}>
              <ArchiveBookmark isArchive={bookmark.isArchived} />
            </DropdownMenuItem>
            {bookmark.isArchived && (
              <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>
                <DeleteBookmarkButton />
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default BookmarkActions;
