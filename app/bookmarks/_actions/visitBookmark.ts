"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Bookmark } from "@/models/Bookmark";

export async function visitBookmark(bookmarkId: string) {
  try {
    await connectDB();
    const session = await auth();
    if (!session) throw new Error("You must login first");

    const currentUserBookmarks = await Bookmark.find({
      userId: session.user?.id,
    });
    const validUser = currentUserBookmarks.some(
      (bookmark) => bookmark._id.toString() === bookmarkId
    );
    if (!validUser)
      throw new Error("You are not allow to update this bookmark");

    const bookmark = await Bookmark.findById(bookmarkId);
    if (bookmark) {
      bookmark.lastVisited = new Date();
      bookmark.visitCount = bookmark?.visitCount + 1;
      await bookmark.save();
    }
  } catch (error) {
    console.error(error);
  }
}
