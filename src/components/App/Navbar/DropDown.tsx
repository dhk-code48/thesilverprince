import { FaEllipsisVertical } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";
import { UseAuth } from "@/context/AuthContext";
import Image from "next/image";

const DropDown: FC = () => {
  const { isLogIn, isLoading, user } = UseAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="my-auto">
        <Button variant="outline" className="p-0 border-0 h-auto">
          <FaEllipsisVertical
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
            {isLogIn ? (
              <Button isLoading={isLoading} variant={"ghost"} className="p-0">
                <Image
                  src={user.photoUrl}
                  alt="user profile"
                  className="rounded-full"
                  width={30}
                  height={30}
                />
              </Button>
            ) : (
              <Link href={"/sign-in"}>
                <Button isLoading={isLoading}>Login</Button>
              </Link>
            )}
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
