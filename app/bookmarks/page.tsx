import Nav from "./_components/Nav";
import BookmarksContainer from "./_components/BookmarksContainer";
import { getBookmarks } from "./_actions/getBookmarks";

type Props = {
  searchParams: Promise<{
    archive: boolean;
    search: string;
    sortBy: string;
  }>;
};

async function page({ searchParams }: Props) {
  const { archive: isArchive, search, sortBy } = await searchParams;

  const bookmarks = await getBookmarks(isArchive, sortBy);
  bookmarks?.sort((a, b) => +b.pinned - +a.pinned);
  const filteredBookmarks = search
    ? bookmarks?.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(search.trim().toLowerCase())
      )
    : bookmarks;

  return (
    <>
      <Nav isArchive={isArchive} />
      <BookmarksContainer
        bookmarks={filteredBookmarks}
        isArchive={isArchive}
        sortBy={sortBy}
        searchQuery={search}
      />
    </>
  );
}

export default page;
