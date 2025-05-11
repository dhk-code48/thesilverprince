import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FC } from "react";
import Collapse from "./Collapse";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface props {
  className?: string;
  synopsis: string;
  id: string;
  volumes: VolumeProps[];
  novelId: string;
}
const Tab: FC<props> = ({
  id,
  novelId,
  className,
  synopsis,
  volumes,
  ...props
}) => {
  let lastVal: number = 0;
  return (
    <Tabs
      defaultValue={"about"}
      className={cn("w-[400px] overflow-hidden", className)}
      {...props}
    >
      <TabsList className="flex justify-start h-auto bg-background text-left">
        <TabsTrigger
          className="data-[state=active]:text-blue-500 border-r px-10 font-bold text-xl"
          value="about"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:text-blue-500 border-l px-10 font-bold text-xl"
          value="tabelContents"
        >
          Table Of Contents
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="pt-10 px-5">
        <h1 className="text-xl font-bold pb-2">Synopsis</h1>
        <p className=" text-justify text-lg">{synopsis}</p>
      </TabsContent>
      <TabsContent value="tabelContents">
        <div>
          <Link
            href={`/novel/${novelId}?chapter=[${volumes?.length - 1},${
              volumes[volumes?.length - 1]?.tabeleOfContents.length - 1
            }]`}
            className="group block lg:px-10 px-0 border-y py-5 mt-8 hover:bg-blue-400 rounded-xl cursor-pointer"
          >
            <Button
              className="font-bold rounded-full mb-3"
              size={"sm"}
              variant={"outline"}
            >
              Recent Released Chapter
            </Button>
            <p className="text-black-600 text-[20px] group-hover:text-white">
              Volume : {volumes[volumes.length - 1]?.name} || Chapter :
              {
                volumes[volumes.length - 1]?.tabeleOfContents[
                  volumes[volumes?.length - 1]?.tabeleOfContents.length - 1
                ].title
              }
            </p>
          </Link>

          {volumes.map((vol, index) => {
            const lastChapterIndex =
              index === 0
                ? 0
                : lastVal +
                  volumes[index - 1].tabeleOfContents.length -
                  volumes[0].tabeleOfContents.length;
            lastVal =
              index !== 0 ? volumes[index - 1].tabeleOfContents.length : 0;
            return (
              <Collapse
                novelId={id}
                volume={vol}
                index={index}
                chapterIndex={lastChapterIndex}
                title={vol.name}
                key={vol.id + index}
              />
            );
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default Tab;
