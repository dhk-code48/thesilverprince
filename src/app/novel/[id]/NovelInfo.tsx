import Breadcrumbs from "@/components/App/Novel/Breadcrumbs";
import Rating from "@/components/App/Novel/Rating";
import Tab from "@/components/App/Novel/Tab";
import { buttonVariants } from "@/components/ui/button";
import { novelProps } from "@/firebase/Read/getNovelData";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface novelInfoProps {
  novel: novelProps;
  volumes: VolumeProps[];
  id: string;
}
const NovelInfo: FC<novelInfoProps> = ({ novel, volumes, id }) => {
  return (
    <>
      <Breadcrumbs id={novel.id} title={novel.title} />
      <div className="flex lg:justify-stretch flex-wrap justify-center mt-10 gap-10">
        <Image
          src={novel.banner}
          width={300}
          height={400}
          className="rounded-xl"
          alt="background of card"
        />
        <div className="flex justify-between text-center lg:text-left flex-col">
          <div>
            <h1 className="font-bold text-3xl">{novel.title}</h1>
            <p className="text-muted-foreground mt-1">{novel.tags}</p>
            <div className="mt-8  lg:mb-0 mb-8 flex gap-5 items-center justify-center lg:justify-start">
              <Rating rating={4.4} />
              <Link
                href={
                  "https://www.webnovel.com/book/pokemon---a-real-story_17998901406022605"
                }
                target="_blank"
                className="text-lg cursor-pointer flex"
              >
                4.4 <p className="text-blue-500">( webnovel.com )</p>
              </Link>
            </div>
          </div>
          <div className="pb-10">
            <Link
              href={"/novel/" + novel.id + "/?chapter=[0,0]"}
              className={buttonVariants()}
            >
              Start Reading
            </Link>
          </div>
        </div>
      </div>
      <Tab
        novelId={novel.id}
        id={id}
        volumes={volumes}
        className="mt-20 px-0 w-full"
        synopsis={novel.synopsis}
      />
    </>
  );
};

export default NovelInfo;
