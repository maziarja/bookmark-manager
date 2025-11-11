import { ArchiveIcon, HomeIcon } from "lucide-react";
import { getTags } from "../_actions/getTags";
import TagsContainer from "./TagsContainer";
import { SheetClose, SheetDescription } from "@/components/ui/sheet";
import Link from "next/link";
import ResetTags from "./ResetTags";

type Props = {
  isArchive: boolean;
};

async function Sidebar({ isArchive }: Props) {
  const tags = await getTags();
  return (
    <div className="py-5">
      <div className="mb-4">
        <SheetClose asChild>
          <Link
            href={"/bookmarks"}
            className={`flex items-center gap-2 py-2 px-3 rounded-xl ${
              !isArchive ? "bg-accent" : ""
            }`}
          >
            <HomeIcon
              size={20}
              className={`${
                isArchive ? "text-sidebar-foreground" : "text-foreground"
              }`}
            />

            <p
              className={`text-base font-semibold ${
                isArchive ? "text-sidebar-foreground" : "text-foreground"
              }`}
            >
              Home
            </p>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/bookmarks?archive=true"}
            className={`flex items-center gap-2 py-2 px-3 rounded-xl ${
              !isArchive ? "" : "bg-accent"
            }`}
          >
            <ArchiveIcon
              size={20}
              className={`${
                isArchive ? "text-foreground" : "text-sidebar-foreground"
              }`}
            />
            <p
              className={`text-base font-semibold ${
                isArchive ? "text-foreground" : "text-sidebar-foreground"
              }`}
            >
              Archived
            </p>
          </Link>
        </SheetClose>
      </div>
      <SheetDescription className="text-xs flex items-center font-bold mb-2 px-3">
        TAGS
        <ResetTags />
      </SheetDescription>
      <ul className="flex flex-col px-3">
        {tags?.map((tag, i) => (
          <TagsContainer key={i} tag={tag} />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
