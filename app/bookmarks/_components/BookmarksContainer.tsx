"use client";

import { useTags } from "@/app/contexts/TagContext";
import { BookmarksType } from "@/lib/types";

type PropsType = {
  bookmarks: BookmarksType | undefined;
};

function BookmarksContainer({ bookmarks }: PropsType) {
  const { tags } = useTags();
  if (!bookmarks) return null;
  const tagsArray = tags.map((tag) => Object.keys(tag)).flat();

  const filteredBookmarks =
    tagsArray.length > 0
      ? bookmarks.filter((bookmark) => {
          return tagsArray.some((tag) => bookmark.tags.includes(tag));
        })
      : bookmarks;

  console.log(filteredBookmarks);
  return <div>this is bookmarks container</div>;
}

export default BookmarksContainer;
