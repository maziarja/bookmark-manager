import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import SidebarContent from "./SidebarContent";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  isArchive: boolean;
};

async function SheetContainer({ isArchive }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} className="bg-card">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SidebarContent isArchive={isArchive} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default SheetContainer;
