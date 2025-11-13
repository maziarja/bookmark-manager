import Nav from "./_components/Nav";
import BookmarksContainer from "./_components/BookmarksContainer";
import { getBookmarks } from "./_actions/getBookmarks";
import DesktopSidebar from "./_components/DesktopSidebar";
import VisitLoadingContainer from "./_components/VisitLoadingContainer";

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
    <div className="lg:grid lg:grid-cols-[296px_1fr] relative">
      <DesktopSidebar isArchive={isArchive} />
      <div>
        <Nav isArchive={isArchive} />
        <BookmarksContainer
          bookmarks={filteredBookmarks}
          isArchive={isArchive}
          sortBy={sortBy}
          searchQuery={search}
        />
      </div>
      <VisitLoadingContainer />
    </div>
  );
}

export default page;
