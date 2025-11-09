"use client";

import { useTags } from "@/app/contexts/TagContext";
import { BookmarksType } from "@/lib/types";
import SortBookmarksContainer from "./SortBookmarksContainer";
import { ScrollArea } from "@/components/ui/scroll-area";
import BookmarkDetailsContainer from "./BookmarkDetailsContainer";
import { useEffect, useRef, useState } from "react";

type PropsType = {
  bookmarks: BookmarksType | undefined;
  isArchive: boolean;
  sortBy: string;
};

function BookmarksContainer({ bookmarks, isArchive, sortBy }: PropsType) {
  const { tags } = useTags();
  const [sortBookmarkContainerHeight, setSortBookmarkContainerHeight] =
    useState(0);
  const navHeight = "64px";

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setSortBookmarkContainerHeight(entry.contentRect.height);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  if (!bookmarks) return null;

  const filteredBookmarks =
    tags.length > 0
      ? bookmarks.filter((bookmark) => {
          return tags.some((tag) => bookmark.tags.includes(tag));
        })
      : bookmarks;

  return (
    <div className="px-4">
      <div ref={ref}>
        <SortBookmarksContainer
          tags={tags}
          isArchive={isArchive}
          sortBy={sortBy}
        />
      </div>

      <ScrollArea
        style={{
          height: `calc(100dvh - ${sortBookmarkContainerHeight}px - ${navHeight}`,
        }}
      >
        <div className="space-y-8 pb-4">
          {filteredBookmarks.map((bookmark) => (
            <BookmarkDetailsContainer key={bookmark._id} bookmark={bookmark} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default BookmarksContainer;
