"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { LuMegaphone } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface cardProps {
  title: string;
  description: string;
  date: Date;
  onClick?: () => void;
  id: string;
  to: string;
}

const AnnouncementCard: FC<cardProps> = ({
  title,
  description,
  to,
  date,
  onClick,
  id,
}) => {
  return (
    <>
      <Card onClick={onClick} className="w-full lg:w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Published on :{" "}
            {date &&
              date?.getFullYear() +
                "/" +
                date?.getMonth() +
                "/" +
                date?.getDay()}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-justify h-[190px] overflow-hidden">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end p-0 pb-2 pr-2">
          <Link
            href={to + "/" + id}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-blue-500 hover:text-blue-700 hover:underline"
            )}
          >
            Read More
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default AnnouncementCard;
