"use client";
import { Button } from "@/components/ui/button";
import { logoutUser } from "../_actions/logoutUser";

function LogoutBtn() {
  async function handleLogoutUser() {
    await logoutUser();
  }

  return <Button onClick={handleLogoutUser}>Logout</Button>;
}

export default LogoutBtn;
