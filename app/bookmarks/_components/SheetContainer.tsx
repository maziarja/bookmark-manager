import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function SheetContainer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <Sidebar />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default SheetContainer;
