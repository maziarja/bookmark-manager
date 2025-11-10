import { SquarePenIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function EditBookmarkButton({
  setOpenEditModal,
}: {
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => setOpenEditModal(true)}
      role="button"
      className="flex w-full cursor-pointer items-center gap-2 text-sm font-semibold"
    >
      <SquarePenIcon size={16} />
      Edit
    </div>
  );
}

export default EditBookmarkButton;
