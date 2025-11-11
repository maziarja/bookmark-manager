"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import EditBookmarkModal from "./EditBookmarkModal";
import { useState } from "react";

function AddBookmarkButton() {
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
      <EditBookmarkModal mode="add" setOpenEditModal={setOpenEditModal} />

      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          <p className="hidden md:block">Add Bookmark</p>
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}

export default AddBookmarkButton;
