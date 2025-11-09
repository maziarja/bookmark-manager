"use client";
import { Button } from "@/components/ui/button";
import { logoutUser } from "../_actions/logoutUser";
import { LogOutIcon } from "lucide-react";

function LogoutBtn() {
  async function handleLogoutUser() {
    await logoutUser();
  }

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="px-0 has-[>svg]:px-0 gap-2"
      onClick={handleLogoutUser}
    >
      <LogOutIcon />
      Logout
    </Button>
  );
}

export default LogoutBtn;
