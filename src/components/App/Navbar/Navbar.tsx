"use client";
import React, { FC } from "react";
import { CgPatreon } from "react-icons/cg";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import ThemeToggle from "../ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { UseAuth } from "@/context/AuthContext";
import { useScroll } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { usePathname, useSearchParams } from "next/navigation";

const Navbar: FC = () => {
  const scrolled = useScroll(50);
  const params = useSearchParams();

  const { isLogIn, isLoading, user } = UseAuth();
  return (
    !params.get("chapter") && (
      <>
        <div
          className={cn(
            "lg:top-0 bottom-0 sticky z-40 overflow-hidden bg-background/60 backdrop-blur-xl transition-all",
            scrolled ? "border-b" : "bg-background"
          )}
        >
          <MaxWidthWrapper className="flex justify-between items-center py-4 h-14">
            <Link href={"/"}>
              <Image
                src="/logo.png"
                width={70}
                height={70}
                alt="website logo"
                className="size-12"
              />
            </Link>

            <div className="hidden md:flex gap-5">
              <NavLink to="/" label="Home" />
              <NavLink to="/novel" label="Novels" />
              <NavLink to="/blogs" label="Blogs" />
              <NavLink to="/news" label="News" />
              <NavLink to="/about" label="About" />
            </div>

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
                <Link href={"/"}>
                  <Button
                    isLoading={isLoading}
                    variant={"ghost"}
                    className="p-0"
                  >
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
          </MaxWidthWrapper>
        </div>
      </>
    )
  );
};

export default Navbar;
