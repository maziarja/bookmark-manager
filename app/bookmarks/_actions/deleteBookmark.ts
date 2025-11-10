"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Bookmark } from "@/models/Bookmark";
import { revalidatePath } from "next/cache";

export async function deleteBookmark(bookmarkId: string) {
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
      throw new Error("You are not allow to delete this bookmark");

    await Bookmark.findByIdAndDelete(bookmarkId);
    revalidatePath("/bookmarks");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
