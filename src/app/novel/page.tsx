"use client";
import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import NovelCard from "@/components/App/Novel/NovelCard";
import useNovels from "@/firebase/Read/getNovels";
import BasicSkeleton from "@/components/Skleaton";
import Head from "next/head";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import FeaturedNovel from "@/components/landing/featured-novel";

const NovelCatalog: FC = () => {
  const novels = useNovels();

  return (
    <MaxWidthWrapper className="bg-card my-10">
      <div className="bg-card px-10 py-10 rounded-xl">
        <Head>
          <title>Novels | TheSilverPrince</title>
        </Head>
        <FeaturedNovel noTitle />
      </div>
    </MaxWidthWrapper>
  );
};

export default NovelCatalog;
