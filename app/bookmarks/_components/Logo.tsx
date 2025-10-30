import { BookmarkIcon } from "lucide-react";

function Logo() {
  return (
    <div className="font-bold  flex gap-2 items-center">
      <div className="bg-primary p-1.5 flex items-center justify-center rounded-xl">
        <BookmarkIcon className="inline-block text-white" size={18} />
      </div>
      <p className="font-bold text-lg">Bookmark Manager</p>
    </div>
  );
}

export default Logo;
