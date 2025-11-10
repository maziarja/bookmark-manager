import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ArrowDownUpIcon, CheckIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  tags: string[];
  isArchive: boolean;
  sortBy: string;
};

function SortBookmarksContainer({
  tags,
  isArchive,
  sortBy: sortedBy = "recently-added",
}: Props) {
  const sortBy = [
    {
      label: "Recently added",
      value: "recently-added",
      href: isArchive
        ? "/bookmarks?archive=true&sortBy=recently-added"
        : "/bookmarks?sortBy=recently-added",
    },
    {
      label: "Recently visited",
      value: "recently-visited",
      href: isArchive
        ? "/bookmarks?archive=true&sortBy=recently-added"
        : "/bookmarks?sortBy=recently-visited",
    },
    {
      label: `Most visited`,
      value: "most-visited",
      href: isArchive
        ? "/bookmarks?archive=true&sortBy=recently-added"
        : "/bookmarks?sortBy=most-visited",
    },
  ];

  return (
    <div className="pt-6 pb-5 flex justify-between items-center gap-6">
      <p className="text-xl font-bold">
        {tags.length === 0
          ? isArchive
            ? "Archived bookmarks"
            : "All bookmarks"
          : `Bookmarks tagged: ${tags.join(", ")}`}
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            size={"lg"}
            className="bg-secondary rounded-xl"
          >
            <ArrowDownUpIcon />
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2" align="end">
          {sortBy.map((sort) => (
            <DropdownMenuItem
              key={sort.label}
              asChild
              className="flex p-2 text-sm font-semibold items-center justify-between"
            >
              <Link href={sort.href}>
                {sort.label}{" "}
                {sortedBy === sort.value && <CheckIcon size={16} />}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SortBookmarksContainer;
