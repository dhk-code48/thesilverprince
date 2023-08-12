"use client";
import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import NovelCard from "@/components/App/Novel/NovelCard";
import useNovels from "@/firebase/Read/getNovels";
import BasicSkeleton from "@/components/Skleaton";
import Head from "next/head";

const NovelCatalog: FC = () => {
  const novels = useNovels();

  return (
    <div className="mt-10 px-5">
      <Head>
        <title>Novels | TheSilverPrince</title>
      </Head>
      <div className="lg:w-[75%] mx-auto">
        <Input placeholder="Search Novels..." />
        <div className="flex justify-start flex-wrap mt-10">
          {novels !== null ? (
            novels.map((novel, index) => {
              return (
                <NovelCard
                  key={novel.id + index}
                  to={"/novel/" + novel.id}
                  src={novel.banner}
                  tags={novel.tags}
                  title={novel.title}
                />
              );
            })
          ) : (
            <BasicSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default NovelCatalog;
