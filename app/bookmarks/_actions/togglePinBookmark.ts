"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { Bookmark } from "@/models/Bookmark";
import { revalidatePath } from "next/cache";

type Data = {
  bookmarkId: string;
  pinned: boolean;
};

export async function togglePinBookmark(data: Data) {
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
      pinned: !data.pinned,
    });

    revalidatePath("/bookmarks");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
