import { auth } from "@/lib/auth";
import Nav from "./_components/Nav";
import BookmarksContainer from "./_components/BookmarksContainer";
import { getBookmarks } from "./_actions/getBookmarks";

async function page() {
  const session = await auth();
  console.log(session);
  const bookmarks = await getBookmarks();

  return (
    <>
      <Nav />
      <BookmarksContainer bookmarks={bookmarks} />
    </>
  );
}

export default page;
