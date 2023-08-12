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
    <div className="flex flex-wrap items-center gap-2 text-muted-foreground p-5 lg:px-0">
      <Link className="" href="/">
        <LuHome />
      </Link>{" "}
      /
      <Link className="" href="/novel">
        Novels
      </Link>
      /
      <Link
        href={"/novel/" + id}
        className={chapter ? "text-muted-foreground " : "text-foreground "}
      >
        {title}
      </Link>{" "}
      {chapter && (
        <>
          <p className="text-foreground ">/ {chapter}</p>{" "}
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
