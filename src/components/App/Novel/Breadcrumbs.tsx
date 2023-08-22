import Link from "next/link";
import React, { FC } from "react";
import { LuHome } from "react-icons/lu";

interface bcProps {
  id: string;
  title: string;
  chapter?: string;
}
const Breadcrumbs: FC<bcProps> = ({ id, title, chapter }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-2 text-muted-foreground p-3 md:p-5 lg:px-0">
      <Link className="text-sm lg:text-base" href="/">
        <LuHome />
      </Link>{" "}
      /
      <Link className="text-sm lg:text-base" href="/novel">
        Novels
      </Link>
      /
      <Link
        href={"/novel/" + id}
        className={
          chapter
            ? "text-sm lg:text-base text-muted-foreground "
            : "text-foreground "
        }
      >
        {title}
      </Link>{" "}
      {chapter && (
        <>
          <p className="text-sm lg:text-base text-foreground ">/ {chapter}</p>{" "}
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
