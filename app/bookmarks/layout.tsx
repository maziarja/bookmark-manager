import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function BookmarkLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return <div>{children}</div>;
}

export default BookmarkLayout;
