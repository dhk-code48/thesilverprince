import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";

interface label {
  label: "admin" | "novel" | "news";
}

const MainNav: FC<label> = ({ label }) => {
  return (
    <nav className={"lg:space-x-6 space-x-4 flex ml-6 w-full"}>
      <Link
        href="/admin"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          label !== "admin" && "text-muted-foreground"
        )}
      >
        Overview
      </Link>
      <Link
        href="/admin/novel"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          label !== "novel" && "text-muted-foreground"
        )}
      >
        Novel
      </Link>
      <Link
        href="/admin/news"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          label !== "news" && "text-muted-foreground"
        )}
      >
        News
      </Link>
    </nav>
  );
};

export default MainNav;
