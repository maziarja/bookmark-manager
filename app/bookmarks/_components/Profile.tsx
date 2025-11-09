import LogoutBtn from "@/app/auth/_components/LogoutBtn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DarkmodeToggle from "@/components/ui/DarkmodeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";

async function Profile() {
  const session = await auth();
  const fullname = session?.user?.name;
  const initials =
    fullname?.split(" ").length === 1
      ? fullname.substring(0, 2).toUpperCase()
      : `${fullname?.split(" ")[0].at(0)?.toUpperCase()} ${fullname
          ?.split(" ")[1]
          .at(0)
          ?.toUpperCase()}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10">
          <AvatarFallback className="font-semibold">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end">
        <DropdownMenuLabel>
          <div>
            <p className="text-foreground capitalize">{fullname}</p>
            <p className="text-">{session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <DarkmodeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutBtn />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Profile;
