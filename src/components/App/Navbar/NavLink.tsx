import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";

interface linkProps {
  label: string;
  icon: React.ReactNode;
  className?: string;
  to?: string | null;
}

const NavLink: FC<linkProps> = ({ label, icon, className, to }) => {
  return (
    <Link
      href={to ? to : "/"}
      className={cn(
        "lg:flex-row lg:text-lg font-semibold text-sm flex items-center flex-col text-slate-700 dark:text-slate-400",
        className
      )}
    >
      {icon}
      <p className="lg:ml-2">{label}</p>
    </Link>
  );
};

export default NavLink;
