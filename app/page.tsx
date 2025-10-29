import { redirect } from "next/navigation";

function page() {
  redirect("/auth/login");
  return null;
}

export default page;
