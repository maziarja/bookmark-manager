"use client";

import { BookmarkType } from "@/lib/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, GlobeIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VisitBookmark from "./VisitBookmark";
import CopyUrlBookmark from "./CopyUrlBookmark";
import UnpinBookmark from "./UnpinBookmark";
import EditBookmarkButton from "./EditBookmarkButton";
import ArchiveBookmark from "./ArchiveBookmarkButton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditBookmarkModal from "./EditBookmarkModal";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ArchiveBookmarkModal from "./ArchiveBookmarkModal";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import { useState } from "react";
import DeleteBookmarkModal from "./DeleteBookmarkModal";

type Props = {
  bookmark: BookmarkType;
};
function BookmarkDetailsContainer({ bookmark }: Props) {
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <Card>
      <CardHeader className="px-4 flex items-center gap-4">
        <>
          {bookmark.favicon ? (
            <Image
              className="border rounded-xl"
              src={bookmark.favicon?.slice(1)}
              width={44}
              height={44}
              alt="favicon"
            />
          ) : (
            <GlobeIcon size={44} className="border rounded-xl" />
          )}
        </>
        <div className="flex flex-col ">
          <CardTitle className="text-xl font-bold">{bookmark.title}</CardTitle>
          <CardDescription>{bookmark.url.split("//")[1]}</CardDescription>
        </div>
        <CardAction className="ml-auto">
          <Dialog>
            <EditBookmarkModal bookmark={bookmark} />
            <AlertDialog
              onOpenChange={setOpenArchiveModal}
              open={openArchiveModal}
            >
              <ArchiveBookmarkModal
                bookmarkId={bookmark._id}
                isArchived={bookmark.isArchived}
              />
            </AlertDialog>

            <AlertDialog
              onOpenChange={setOpenDeleteModal}
              open={openDeleteModal}
            >
              <DeleteBookmarkModal />
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
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <VisitBookmark url={bookmark.url} />
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
                      <DialogTrigger className="w-full">
                        <EditBookmarkButton />
                      </DialogTrigger>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => setOpenArchiveModal(true)}>
                    <ArchiveBookmark
                      isArchive={bookmark.isArchived}
                      bookmarkId={bookmark._id}
                    />
                  </DropdownMenuItem>
                  {bookmark.isArchived && (
                    <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>
                      <DeleteBookmarkButton />
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        </CardAction>
      </CardHeader>
      <Separator className="max-w-[90%] mx-auto" />
      <CardContent className="px-4">
        <p>{bookmark.description}</p>
      </CardContent>
      <CardFooter className="px-4">
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default BookmarkDetailsContainer;
