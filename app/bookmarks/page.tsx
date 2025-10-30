import { auth } from "@/lib/auth";
import LogoutBtn from "../auth/_components/LogoutBtn";

async function page() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      this is bookmarks
      <LogoutBtn />
    </div>
  );
}

export default page;
