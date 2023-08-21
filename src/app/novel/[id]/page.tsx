"use client";
import useNovel from "@/firebase/Read/getNovelData";
import useVolumes from "@/firebase/Read/getVolumes";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import NovelInfo from "./NovelInfo";
import Chapter from "./Chapter";

interface pageProps {
  params: { id: string };
}
const Novel: FC<pageProps> = ({ params }) => {
  const router = useSearchParams();
  const [chapterIndex, setChapterIndex] = useState(0);
  const [volumeIndex, setVolumeIndex] = useState(0);

  useEffect(() => {
    const chapArr = JSON.parse(router.get("chapter")?.toString() || "[0,0]");
    setVolumeIndex(chapArr[0]);
    setChapterIndex(chapArr[1]);
  }, [router]);

  const novel = useNovel(params.id);
  const volumes = useVolumes(params.id);

  useEffect(() => {
    if (novel) {
      const { title, synopsis } = novel;
      document.title = title + "| TheSilverPrince";
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", synopsis);
      }
    }
  }, [novel]);

  return (
    <div className="pt-10 lg:w-[70%] mx-auto">
      {novel !== null && volumes !== null ? (
        <>
          {router.get("chapter") === null ? (
            <NovelInfo novel={novel} volumes={volumes} id={params.id} />
          ) : (
            <Chapter
              novelTitle={novel.title}
              volumeIndex={volumeIndex}
              volumes={volumes}
              chapterIndex={chapterIndex}
              novelId={params.id}
            />
          )}
        </>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <AiOutlineLoading className="animate-spin" size={40} />
        </div>
      )}
    </div>
  );
};

export default Novel;
