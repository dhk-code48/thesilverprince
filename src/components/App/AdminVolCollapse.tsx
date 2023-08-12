"use client";

import * as React from "react";
import { LuCheck, LuChevronDown, LuPlus, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AiOutlineLoading } from "react-icons/ai";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import { Input } from "../ui/input";
import editVolume from "@/firebase/Update/editVolume";
import { deleteDoc, doc } from "firebase/firestore";
import deleteVolume from "@/firebase/Delete/deleteVolume";

interface pageProps {
  novelId: string;
  index: number;
  volume: VolumeProps;
  setPageAdd: (vol: VolumeProps) => void;
  setPageEdit: (vol: VolumeProps, chapterId: string) => void;
}

const AdminVolCollapse: React.FC<pageProps> = ({
  setPageAdd,
  novelId,
  setPageEdit,
  volume,
  index,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [volumeName, setVolumeName] = React.useState<string>("");

  React.useEffect(() => {
    setVolumeName(volume.name);
  }, [volume]);

  function handleVolEdition() {
    if (volume !== null) {
      editVolume({
        novelId: novelId,
        publishedOn: volume.publishedOn,
        volume: volume,
        volumeId: volume.id,
        volumeName: volumeName,
      });
    }
  }
  function handleVolDeletion() {
    deleteVolume(novelId, volume);
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="my-5 space-y-2"
    >
      <div className="flex border items-center justify-between space-x-4 px-10 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
        <div className="flex gap-20 items-center">
          <h4 className="text-lg font-semibold">Volume {index} :</h4>
          <div className="flex gap-5">
            <Input
              value={volumeName}
              onChange={(e) => setVolumeName(e.target.value)}
            />
            <Button onClick={handleVolEdition} size={"sm"} variant={"outline"}>
              <LuCheck />
            </Button>
            <Button
              variant={"outline"}
              className="ml-10"
              onClick={handleVolDeletion}
            >
              <LuTrash2 />
            </Button>
          </div>
        </div>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <LuChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 grid grid-cols-2">
        {volume.tabeleOfContents ? (
          volume.tabeleOfContents.map((chapter, chapterIndex) => {
            return (
              <div
                onClick={() => setPageEdit(volume, chapter.id)}
                key={chapterIndex + chapter.id}
                className="text-lg rounded-md border-b ml-5 py-3 px-5 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                Chapter {chapterIndex + 1}: {chapter.title}
              </div>
            );
          })
        ) : (
          <div className="rounded-md border-b flex justify-center py-5">
            <AiOutlineLoading className="animate-spin" size={30} />
          </div>
        )}
        <CollapsibleContent>
          <Button className="mx-10" onClick={() => setPageAdd(volume)}>
            Add Chapter <LuPlus />
          </Button>
        </CollapsibleContent>
      </CollapsibleContent>
    </Collapsible>
  );
};
export default AdminVolCollapse;
