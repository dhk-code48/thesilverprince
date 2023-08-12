"use client";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { VolumeProps, tabeleOfContents } from "@/firebase/Read/getVolumes";
import { chapterProps } from "@/firebase/Read/getChapter";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { DocumentReference } from "firebase/firestore";
import ChapterHeader from "@/components/App/Novel/ChapterHeader";
import ChapterNav from "@/components/App/Novel/ChapterNav";
import SideBar from "@/components/App/Navbar/SideBar";
import NovelComments from "@/components/App/Navbar/NovelComments";

interface pageProps {
  novelId: string;
  volumes: VolumeProps[];
  volumeIndex: number;
  novelTitle: string;
  chapterIndex: number;
}

const Chapter: FC<pageProps> = ({
  novelTitle,
  novelId,
  volumeIndex,
  chapterIndex,
  volumes,
}) => {
  const [chapIndex, setChapIndex] = useState<number>(chapterIndex);
  const [volIndex, setVolIndex] = useState<number>(volumeIndex);
  const [toc, setToc] = useState<tabeleOfContents[]>([]);

  const [chapter, setChapter] = useState<chapterProps | null>(null);

  useEffect(() => {
    setToc(volumes[volIndex].tabeleOfContents);
  }, [volumes, volIndex]);

  useEffect(() => {
    setChapIndex(chapterIndex);
    setVolIndex(volumeIndex);
  }, [chapterIndex, volumeIndex]);

  useEffect(() => {
    async function getChapter(ref: DocumentReference) {
      const doc = await getDoc(ref);

      if (doc.exists()) {
        setChapter({
          id: doc.id,
          content: doc.data().content,
          publishedOn: doc.data().publishedOn,
          title: doc.data().title,
        });
      }
    }
    if (volumes !== null && toc[chapIndex]) {
      console.log("TOC", toc);
      const ref = doc(
        db,
        "Novels",
        novelId,
        "Volumes",
        volumes[volIndex].id,
        "Chapters",
        toc[chapIndex].id
      );
      getChapter(ref);
    }
  }, [chapIndex, volIndex, volumes, toc, novelId]);

  function handlePrevious() {
    if (chapIndex === 0) {
      setVolIndex((prev) => prev - 1);
      setChapIndex(volumes[volIndex - 1].tabeleOfContents.length - 1);
    } else {
      setChapIndex((prev) => prev - 1);
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }
  function handleNext() {
    if (chapIndex === toc.length - 1) {
      setVolIndex((prev) => prev + 1);
      setChapIndex(0);
    } else {
      setChapIndex((prev) => prev + 1);
    }
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }
  return (
    <div className="lg:w-[900px] mx-auto mt-10 lg:mt-0 px-10 pt-10 pb-20 bg-paper rounded-xl">
      {chapter !== null ? (
        <>
          <SideBar
            novelId={novelId}
            volumes={volumes}
            tableOfContents={volumes[volIndex].tabeleOfContents}
            volIndex={volIndex}
            chapIndex={chapIndex}
          />
          <ChapterNav
            novelId={novelId}
            novelTitle={novelTitle}
            title={chapter.title}
          />
          <ChapterHeader
            nextDisable={
              volIndex === volumes.length - 1 &&
              chapIndex ===
                volumes[volumes.length - 1].tabeleOfContents.length - 1
            }
            prevDisable={chapIndex === 0 && volIndex === 0}
            chapterTitle={chapter.title}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            novelId={novelId}
          />
          <p
            className="text-justify chapter mx-auto pb-20 font-body dark:text-white"
            style={{ fontSize: "18px", lineHeight: "34.8px" }}
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
          <ChapterHeader
            noTitle
            prevDisable={chapIndex === 0 && volIndex === 0}
            nextDisable={
              volIndex === volumes.length - 1 &&
              chapIndex ===
                volumes[volumes.length - 1].tabeleOfContents.length - 1
            }
            chapterTitle={chapter.title}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            novelId={novelId}
          />
          <NovelComments
            chapId={volumes[volIndex].tabeleOfContents[chapIndex].id}
            novelId={novelId}
            novelTitle={novelTitle}
            volId={volumes[volIndex].id}
          />
        </>
      ) : (
        <div className="flex justify-center">
          <AiOutlineLoading className="animate-spin" size={60} />
        </div>
      )}
    </div>
  );
};

export default Chapter;
