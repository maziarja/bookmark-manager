"use server";

import { auth } from "@/lib/auth";
import connectDB from "@/lib/database";
import { AddBookmarkType } from "@/lib/types";
import { Bookmark } from "@/models/Bookmark";
import { revalidatePath } from "next/cache";

export async function updateBookmark(data: AddBookmarkType) {
  try {
    await connectDB();
    const session = await auth();
    if (!session) throw new Error("You must login first");

    const currentUserBookmarks = await Bookmark.find({
      userId: session.user?.id,
    });
    const validUser = currentUserBookmarks.some(
      (bookmark) => bookmark._id.toString() === data.id
    );
    if (!validUser)
      throw new Error("You are not allow to update this bookmark");

    let favicon = "";
    const faviconUrl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${data.website}&size=64`;
    const res = await fetch(faviconUrl);
    if (res.ok) {
      favicon = faviconUrl;
    }

    await Bookmark.findByIdAndUpdate(data.id, {
      title: data.title,
      description: data.description,
      url: data.website,
      tags: data.tags.split(","),
      favicon,
    });

    revalidatePath("/bookmarks");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
