"use client";
import React, { FC } from "react";
import {
  LuHome,
  LuBookMinus,
  LuMegaphone,
  LuInfo,
  LuUser,
} from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import ThemeToggle from "../ThemeToggle";
import DropDown from "./DropDown";
import { Button } from "@/components/ui/button";
import { UseAuth } from "@/context/AuthContext";

const Navbar: FC = () => {
  const { isLogIn, isLoading, user } = UseAuth();
  return (
    <div className="fixed overflow-hidden h-20 bottom-0 lg:top-0 bg-background w-screen z-10">
      <div className="w-full lg:w-[70%] h-full items-center lg:justify-between mx-auto flex justify-center">
        <div className="lg:flex lg:gap-12">
          <Link href={"/"} className="hidden lg:inline-block">
            <Image src="/logo.png" width={70} height={70} alt="website logo" />
          </Link>
          <div className="flex gap-10">
            <NavLink to="/" icon={<LuHome size={24} />} label="Home" />
            <NavLink
              to="/novel"
              icon={<LuBookMinus size={24} />}
              label="Novels"
            />
            <NavLink to="/news" icon={<LuMegaphone size={24} />} label="News" />
            <NavLink to="/about" icon={<LuInfo size={24} />} label="About" />
            <NavLink
              className="lg:hidden flex"
              icon={<DropDown />}
              label="More"
            />
          </div>
        </div>
        <div className="lg:flex hidden items-center gap-4">
          <ThemeToggle />
          {isLogIn ? (
            <Link href={"/user"}>
              <Button isLoading={isLoading} variant={"ghost"} className="p-0">
                <Image
                  src={user.photoUrl}
                  alt="user profile"
                  className="rounded-full"
                  width={30}
                  height={30}
                />
              </Button>
            </Link>
          ) : (
            <Link href={"/sign-in"}>
              <Button isLoading={isLoading}>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
