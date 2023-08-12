import {
  LuCloud,
  LuGithub,
  LuLifeBuoy,
  LuLogOut,
  LuMail,
  LuMessageSquare,
  LuMoreVertical,
  LuPlus,
  LuPlusCircle,
  LuUser,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";

const DropDown: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="my-auto">
        <Button variant="outline" className="p-0 border-0 h-auto">
          <LuMoreVertical
            size={24}
            className="text-slate-700 dark:text-slate-400"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>The Silver Prince</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/sign-in" className="flex">
              <LuUser className="mr-2 h-4 w-4" />
              <span>Login</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ThemeToggle />
            <span className="ml-2">Theme Toggle</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropDown;
