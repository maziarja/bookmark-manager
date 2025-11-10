"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Bookmark } from "@/models/Bookmark";
import { revalidatePath } from "next/cache";

type Data = {
  bookmarkId: string;
  isArchived: boolean;
};

export async function archiveBookmark(data: Data) {
  try {
    await connectDB();
    const session = await auth();
    if (!session) throw new Error("You must login first");

    const currentUserBookmarks = await Bookmark.find({
      userId: session.user?.id,
    });
    const validUser = currentUserBookmarks.some(
      (bookmark) => bookmark._id.toString() === data.bookmarkId
    );
    if (!validUser)
      throw new Error("You are not allow to update this bookmark");

    await Bookmark.findByIdAndUpdate(data.bookmarkId, {
      isArchived: !data.isArchived,
    });

    revalidatePath("/bookmarks");
  } catch (error) {
    console.error(error);
  }
}
