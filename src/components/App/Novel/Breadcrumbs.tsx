import Link from "next/link";
import React, { FC } from "react";
import { FiHome } from "react-icons/fi";

interface bcProps {
  id: string;
  title: string;
  chapter?: string;
}
const Breadcrumbs: FC<bcProps> = ({ id, title, chapter }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-2 p-3 md:p-5 lg:px-0 text-muted-foreground">
      <Link className="text-sm lg:text-base" href="/">
        <FiHome />
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
          <p className="text-foreground text-sm lg:text-base">/ {chapter}</p>{" "}
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
