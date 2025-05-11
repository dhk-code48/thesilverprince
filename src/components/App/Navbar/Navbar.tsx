"use client";
import React, { FC } from "react";
import { LuBookMinus, LuMegaphone, LuInfo } from "react-icons/lu";
import { CgHome, CgPatreon } from "react-icons/cg";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import Image from "next/image";
import NavLink from "./NavLink";
import ThemeToggle from "../ThemeToggle";
import DropDown from "./DropDown";
import { Button, buttonVariants } from "@/components/ui/button";
import { UseAuth } from "@/context/AuthContext";

const Navbar: FC = () => {
  const { isLogIn, isLoading, user } = UseAuth();
  return (
    <>
      <div className="lg:hidden flex justify-between px-5 w-full">
        <Image src="/logo.png" width={70} height={70} alt="website logo" />

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href={"https://www.patreon.com/TheSilverPrince1"}
            target="_blank"
            className={buttonVariants({ variant: "outline" })}
          >
            <CgPatreon size={20} />
          </Link>
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
        </div>
      </div>
      <div className="lg:top-0 bottom-0 z-10 fixed bg-background w-screen h-20 overflow-hidden">
        <div className="flex justify-center lg:justify-between items-center mx-auto w-full lg:w-[70%] h-full">
          <div className="lg:flex lg:gap-12">
            <Link href={"/"} className="hidden lg:inline-block">
              <Image
                src="/logo.png"
                width={70}
                height={70}
                alt="website logo"
              />
            </Link>
            <div className="flex gap-10">
              <NavLink to="/" icon={<FiHome size={24} />} label="Home" />
              <NavLink
                to="/novel"
                icon={<LuBookMinus size={24} />}
                label="Novels"
              />
              <NavLink
                to="/news"
                icon={<LuMegaphone size={24} />}
                label="News"
              />
              <NavLink to="/about" icon={<LuInfo size={24} />} label="About" />
              <NavLink
                className="lg:hidden flex"
                icon={<DropDown />}
                label="More"
              />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href={"https://www.patreon.com/TheSilverPrince1"}
              target="_blank"
              className={buttonVariants({ variant: "outline" })}
            >
              <CgPatreon size={20} />
            </Link>
            {isLogIn ? (
              <Link href={"/"}>
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
    </>
  );
};

export default Navbar;
