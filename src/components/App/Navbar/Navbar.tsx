"use client";
import { CgPatreon } from "react-icons/cg";
import type React from "react";

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
import { Home, BookOpen, FileText, Bell, Info } from "lucide-react";

const Navbar = () => {
  const scrolled = useScroll(50);
  const params = useSearchParams();
  const pathname = usePathname();

  const { isLogIn, isLoading, user } = UseAuth();

  if (params.get("chapter")) {
    return null;
  }

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className={cn(
          "sticky top-0 z-40 w-full overflow-hidden bg-background/60 backdrop-blur-xl transition-all md:block hidden",
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

          <div className="flex gap-5">
            <NavLink to="/" label="Home" />
            <NavLink to="/novel" label="Novels" />
            <NavLink to="/blogs" label="Blogs" />
            <NavLink to="/news" label="Announcements" />
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
                <Button isLoading={isLoading} variant={"ghost"} className="p-0">
                  <Image
                    src={user.photoUrl || "/placeholder.svg"}
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

      {/* Mobile Top Navbar (simplified) */}
      <div
        className={cn(
          "sticky top-0 z-40 w-full overflow-hidden bg-background/60 backdrop-blur-xl transition-all md:hidden",
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

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isLogIn ? (
              <Link href={"/"}>
                <Button isLoading={isLoading} variant={"ghost"} className="p-0">
                  <Image
                    src={user.photoUrl || "/placeholder.svg"}
                    alt="user profile"
                    className="rounded-full"
                    width={30}
                    height={30}
                  />
                </Button>
              </Link>
            ) : (
              <Link href={"/sign-in"}>
                <Button isLoading={isLoading} size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Bottom Tab Navigation for Mobile */}
      <div className="md:hidden right-0 bottom-0 left-0 z-50 fixed bg-background border-t">
        <div className="grid grid-cols-5 h-16">
          <BottomTab
            href="/"
            icon={<Home className="w-5 h-5" />}
            label="Home"
            isActive={pathname === "/"}
          />
          <BottomTab
            href="/novel"
            icon={<BookOpen className="w-5 h-5" />}
            label="Novels"
            isActive={pathname === "/novel" || pathname.startsWith("/novel/")}
          />
          <BottomTab
            href="/blogs"
            icon={<FileText className="w-5 h-5" />}
            label="Blogs"
            isActive={pathname === "/blogs" || pathname.startsWith("/blogs/")}
          />
          <BottomTab
            href="/news"
            icon={<Bell className="w-5 h-5" />}
            label="Announcements"
            isActive={pathname === "/news" || pathname.startsWith("/news/")}
          />
          <BottomTab
            href="/about"
            icon={<Info className="w-5 h-5" />}
            label="About"
            isActive={pathname === "/about"}
          />
        </div>
      </div>

      {/* Add padding to the bottom of the page on mobile to account for the tab bar */}
      <div className="md:hidden h-16" />
    </>
  );
};

// Bottom Tab component for mobile navigation
const BottomTab = ({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center text-xs font-medium transition-colors",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center mb-1",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
