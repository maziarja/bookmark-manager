import { SquarePenIcon } from "lucide-react";

function EditBookmarkButton() {
  return (
    <div
      role="button"
      className="flex w-full cursor-pointer items-center gap-2 text-sm font-semibold"
    >
      <SquarePenIcon size={16} />
      Edit
    </div>
  );
}

export default EditBookmarkButton;
