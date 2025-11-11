import Link from "next/link";
import { getTags } from "../_actions/getTags";
import { ArchiveIcon, HomeIcon } from "lucide-react";
import TagsContainer from "./TagsContainer";
import Logo from "./Logo";
import ResetTags from "./ResetTags";

async function DesktopSidebar({ isArchive }: { isArchive: boolean }) {
  const tags = await getTags();
  return (
    <div className="bg-card border-r hidden lg:block">
      <Logo className="p-5" />
      <div className="p-4">
        <div className="mb-4">
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
        <div className="text-xs font-bold mb-2 px-3 flex items-center">
          <p>TAGS</p>
          <ResetTags />
        </div>
        <ul className="flex flex-col px-3">
          {tags?.map((tag, i) => (
            <TagsContainer key={i} tag={tag} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DesktopSidebar;
