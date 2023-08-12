"use client";
import { Button } from "@/components/ui/button";
import React, { FC, useEffect, useRef, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { LuMenu } from "react-icons/lu";
import ThemeToggle from "../ThemeToggle";
import { VolumeProps, tabeleOfContents } from "@/firebase/Read/getVolumes";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface sideProps {
  tableOfContents: tabeleOfContents[];
  volIndex: number;
  chapIndex: number;
  volumes: VolumeProps[];
  novelId: string;
}

const SideBar: FC<sideProps> = ({
  tableOfContents,
  volIndex,
  novelId,
  volumes,
  chapIndex,
}) => {
  const [drawerState, setDrawerState] = useState(false);
  const [selectedVol, setSelectedVol] = useState<number>(volIndex);

  useEffect(() => {
    setSelectedVol(volIndex);
  }, [volIndex]);

  const tcContainer = useRef(null);

  useEffect(() => {
    if (tcContainer.current !== null) {
      const scrollToChapter = () => {
        const chapterElement = document.getElementById(`chap-${chapIndex}`);
        if (chapterElement) {
          chapterElement.scrollIntoView({ behavior: "smooth" });
        }
      };
      scrollToChapter();
    }
  }, [chapIndex]);

  return (
    <div className="fixed top-[45px] right-10 lg:right-0 z-40 lg:h-screen dark:bg-slate-900 lg:bg-gray-200">
      <div className="flex lg:h-screen lg:flex-col justify-center items-center gap-5 w-[50px]">
        <Button
          variant={"ghost"}
          onClick={() => setDrawerState((prev) => !prev)}
        >
          <AiOutlineMenuFold size={20} />
        </Button>
        <div className="flex">
          <ThemeToggle />
        </div>
      </div>
      {drawerState && (
        <div
          ref={tcContainer}
          className="fixed lg:w-[400px] w-[80%] pb-20 scrollbar top-20 right-0 lg:right-[70px] rounded p-5 h-screen dark:bg-slate-900 bg-gray-200 overflow-y-scroll"
        >
          <h1 className="text-2xl font-bold">Table of Contents</h1>
          <Select
            value={selectedVol.toString()}
            onValueChange={(e) => setSelectedVol(parseInt(e))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Volumes</SelectLabel>
                {volumes !== null ? (
                  volumes.map((volume, index) => {
                    return (
                      <SelectItem
                        className="text-[16px] py-4"
                        defaultChecked={index === volIndex}
                        key={index + volume.id}
                        value={index.toString()}
                      >
                        {volume.name}
                      </SelectItem>
                    );
                  })
                ) : (
                  <SelectItem value="apple">Loading....</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            {volumes[selectedVol].tabeleOfContents.map((chapter, index) => (
              <Link
                href={
                  "/novel/" +
                  novelId +
                  "/?chapter=[" +
                  selectedVol +
                  "," +
                  index +
                  "]"
                }
                className="p-5 block hover:bg-gray-300 dark:hover:bg-slate-800 border border-gray-300 dark:border-gray-700 my-5 rounded-lg"
                key={index}
                id={`chap-${index}`}
              >
                {chapter.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
