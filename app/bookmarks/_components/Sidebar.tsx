import { ArchiveIcon, HomeIcon } from "lucide-react";
import { getTags } from "../_actions/getTags";
import TagsContainer from "./TagsContainer";
import { SheetDescription } from "@/components/ui/sheet";

async function Sidebar() {
  const tagsArray = await getTags();

  return (
    <div className="py-5">
      <div className="mb-4">
        <div className="flex items-center gap-2 py-2">
          <HomeIcon size={20} />
          <p className="text-base font-semibold text-foreground">Home</p>
        </div>
        <div className="flex items-center gap-2 py-2">
          <ArchiveIcon size={20} />
          <p className="text-base font-semibold  text-foreground">Archived</p>
        </div>
      </div>
      <SheetDescription className="text-xs font-bold mb-1">
        TAGS
      </SheetDescription>
      <ul className="flex flex-col">
        {tagsArray?.map((tag, i) => (
          <TagsContainer key={i} tagObj={tag} />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
