import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TagsProvider } from "../contexts/TagContext";

async function BookmarkLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div>
      <TagsProvider>{children}</TagsProvider>
    </div>
  );
}

export default BookmarkLayout;
