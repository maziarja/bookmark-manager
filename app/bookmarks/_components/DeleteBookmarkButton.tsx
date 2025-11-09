import { Trash2Icon } from "lucide-react";

function DeleteBookmarkButton() {
  return (
    <div
      role="button"
      className="flex w-full cursor-pointer items-center gap-2 text-sm font-semibold"
    >
      <Trash2Icon size={16} />
      Delete Permanently
    </div>
  );
}

export default DeleteBookmarkButton;
