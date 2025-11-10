import { PinIcon, PinOffIcon } from "lucide-react";
import { togglePinBookmark } from "../_actions/togglePinBookmark";
import { toast } from "sonner";

type Props = {
  bookmarkId: string;
  pinned: boolean;
};

function UnpinBookmark({ bookmarkId, pinned }: Props) {
  async function handlePinBookmark() {
    const data = { pinned, bookmarkId };
    const result = await togglePinBookmark(data);
    if (result.success) {
      toast(
        <p className="text-sm font-medium">
          Bookmark {pinned ? "unpinned." : "pinned to top."}
        </p>,
        {
          icon: pinned ? <PinOffIcon size={20} /> : <PinIcon size={20} />,
        }
      );
    }
  }

  return (
    <button
      onClick={handlePinBookmark}
      className="flex w-full cursor-pointer items-center gap-2 text-sm font-semibold"
    >
      {pinned ? (
        <>
          <PinOffIcon size={16} />
          Unpin
        </>
      ) : (
        <>
          <PinIcon size={16} />
          Pin
        </>
      )}
    </button>
  );
}

export default UnpinBookmark;
