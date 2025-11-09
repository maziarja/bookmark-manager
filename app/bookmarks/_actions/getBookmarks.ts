"use server";

import { auth } from "@/lib/auth";
import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { bookmarksSchema } from "@/lib/types";
import { Bookmark } from "@/models/Bookmark";

export async function getBookmarks(isArchive: boolean, sortBy: string) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) throw new Error("You must login first");

  const sort: Record<string, 1 | -1> = {
    ...(sortBy === "last-visited" && { lastVisited: -1 }),
    ...(sortBy === "recently-added" && { createdAt: -1 }),
    ...(sortBy === "most-visited" && { visitCount: -1 }),
  };

  const bookmarksDoc = await Bookmark.find({
    userId: session.user.id,
    isArchived: isArchive ? true : false,
  })
    .sort(sort)
    .lean();

  const bookmarks = convertToObject(bookmarksDoc);
  const validBookmarks = bookmarksSchema.safeParse(bookmarks);
  if (!validBookmarks.success) {
    console.error(validBookmarks.error.issues[0]);
    return;
  }

  return validBookmarks.data;
}
