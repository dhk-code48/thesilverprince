"use client";

import * as React from "react";
import { LuChevronDown } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { chapterProps } from "@/firebase/Read/getChapters";
import { AiOutlineLoading } from "react-icons/ai";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import Link from "next/link";
import moment from "moment";
import { VolumeProps } from "@/firebase/Read/getVolumes";

interface pageProps {
  title: string;
  novelId: string;
  volume: VolumeProps;
  chapterIndex: number;
  index: number;
}

const Collapse: React.FC<pageProps> = ({
  title,
  novelId,
  chapterIndex,
  volume,
  index,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // React.useEffect(() => {
  //   const ref = query(
  //     collection(db, "Novels", novelId, "Volumes", volumeId, "Chapters"),
  //     orderBy("publishedOn", "asc")
  //   );
  //   async function getVolume() {
  //     if (isOpen && chapters.length == 0) {
  //       const docs = await getDocs(ref);
  //       const volumeData: chapterProps[] = [];
  //       docs.forEach((doc) => {
  //         const data = doc.data();

  //         if (doc.exists()) {
  //           volumeData.push({
  //             content: data.content,
  //             title: data.title,
  //             id: doc.id,
  //             state: data.state,
  //             publishedOn: data.publishedOn,
  //           });
  //         }
  //       });
  //       setChapters(volumeData);
  //     }
  //   }

  //   getVolume();
  // }, [isOpen]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="my-5 space-y-2"
    >
      <div className="flex border items-center justify-between space-x-4 px-3 lg:px-10 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
        <h4 className="text-xl font-semibold">
          Volume {index} : {title}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <LuChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 grid grid-col-1 lg:grid-cols-2">
        {volume !== null ? (
          volume.tabeleOfContents.map((chapter, cI) => {
            return (
              <Link
                href={
                  "/novel/" + novelId + "/?chapter=[" + index + "," + cI + "]"
                }
                key={cI + chapter.id}
                className="text-lg rounded-md border-b ml-5 py-3 px-2 lg:px-5 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                Chapter {index === 0 ? cI : cI + chapterIndex + 1}:{" "}
                {chapter.title}
                {/* <p className="text-muted-foreground text-sm">
                  {moment(chapter.publishedOn?.toDate()).fromNow()}
                </p> */}
              </Link>
            );
          })
        ) : (
          <div className="rounded-md border-b flex justify-center py-5">
            <AiOutlineLoading className="animate-spin" size={30} />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
export default Collapse;
