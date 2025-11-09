import AddBookmarkButton from "./AddBookmarkButton";
import Profile from "./Profile";
import SearchInput from "./SearchInput";
import SidebarContainer from "./SidebarContainer";

type Props = {
  isArchive: boolean;
};

function Nav({ isArchive }: Props) {
  return (
    <nav className="px-4 py-3 bg-card flex gap-2.5 items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarContainer isArchive={isArchive} />
        <SearchInput />
      </div>
      <div className="flex items-center gap-4">
        <AddBookmarkButton />
        <Profile />
      </div>
    </nav>
  );
}

export default Nav;
