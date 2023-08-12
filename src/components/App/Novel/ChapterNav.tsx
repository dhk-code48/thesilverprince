import Image from "next/image";
import React, { FC } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ThemeToggle from "../ThemeToggle";

interface navProps {
  novelTitle: string;
  novelId: string;
  title: string;
}

const ChapterNav: FC<navProps> = ({ novelTitle, title, novelId }) => {
  return (
    <div className="fixed top-0 left-0 z-20 bg-gray-100 dark:bg-background w-screen lg:h-20 h-auto">
      <div className="lg:h-14 h-24 lg:px-20 flex flex-col items-center bg-white dark:bg-slate-900 justify-between">
        <div className="flex flex-wrap gap-20">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            className="rounded-lg hidden lg:block"
            alt="website logo"
          />
          <Breadcrumbs id={novelId} title={novelTitle} chapter={title} />
        </div>
      </div>
    </div>
  );
};

export default ChapterNav;
