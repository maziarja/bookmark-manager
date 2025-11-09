import { PinIcon, PinOffIcon } from "lucide-react";

type Props = {
  bookmarkId: string;
  pinned: boolean;
};

function UnpinBookmark({ bookmarkId, pinned }: Props) {
  function handlePinBookmark() {
    console.log(bookmarkId);
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
