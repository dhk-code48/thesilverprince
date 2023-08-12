import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FC } from "react";
import Collapse from "./Collapse";
import { VolumeProps } from "@/firebase/Read/getVolumes";

interface props {
  className?: string;
  synopsis: string;
  id: string;
  volumes: VolumeProps[];
}
const Tab: FC<props> = ({ id, className, synopsis, volumes, ...props }) => {
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
          Tabel Of Contents
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="pt-10 px-5">
        <h1 className="text-xl font-bold pb-2">Synopsis</h1>
        <p className=" text-justify text-lg">{synopsis}</p>
      </TabsContent>
      <TabsContent value="tabelContents">
        {volumes.map((vol, index) => {
          const lastChapterIndex =
            index === 0
              ? 0
              : volumes[index - 1].tabeleOfContents.length -
                volumes[0].tabeleOfContents.length;
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
      </TabsContent>
    </Tabs>
  );
};
export default Tab;
