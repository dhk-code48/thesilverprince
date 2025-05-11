"use client";
import useNovel from "@/firebase/Read/getNovelData";
import useVolumes from "@/firebase/Read/getVolumes";
import { useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState, use } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import NovelInfo from "./NovelInfo";
import Chapter from "./Chapter";
import Head from "next/head";

interface pageProps {
  params: Promise<{ id: string }>;
}
const Novel: FC<pageProps> = (props) => {
  const params = use(props.params);
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

  // useEffect(() => {
  //   if (novel) {
  //     const { title, synopsis } = novel;
  //     document.title = title + "| TheSilverPrince";
  //     const metaDescription = document.querySelector(
  //       'meta[name="description"]'
  //     );
  //     if (metaDescription) {
  //       metaDescription.setAttribute("content", synopsis);
  //     }
  //   }
  // }, [novel]);

  return (
    <div className="mx-auto py-10 lg:w-[70%]">
      <Head>
        <title>
          Read Pokemon Pokemon - A Real Story | TheSilverPrince | Pokemon,
          System, Reincarnation, Adventure, Action, War, Conqueror,
        </title>
        <meta
          name="description"
          content="There is a substantial gap between the storyline of anime and the realistic narrative of Pokémon. This light novel aims to bridge that gap, providing viewers with a believable and thrilling adventure-packed story. Follow our protagonist, Axel Blaze, a reincarnated individual, who, armed with knowledge from the previous Pokémon world, aspires to achieve world domination. However, he comes to realize how utterly mistaken he was. This novel incorporates a system for added enjoyment, although the story does not revolve around it. 'Success is like being pregnant, everyone says congratulations but nobody knows how many times you were fucked.' Thus, this novel chronicles Axel Blaze's journey, shedding light on the concealed challenges he must confront to reach his dream."
        />
      </Head>
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
        <div className="flex justify-center items-center mt-10">
          <AiOutlineLoading className="animate-spin" size={40} />
        </div>
      )}
    </div>
  );
};

export default Novel;
