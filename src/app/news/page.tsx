"use client";
import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import AnnouncementCard from "@/components/App/Announcement";
import useNews from "@/firebase/Read/getNews";
import BasicSkeleton from "@/components/Skleaton";
import Head from "next/head";

const Novel: FC = () => {
  const news = useNews();
  return (
    <div className="mt-10 px-5">
      <Head>
        <title>TheSilverPince | News</title>
      </Head>
      <div className="lg:w-[75%] mx-auto">
        <Input placeholder="Search News..." />
        <div className="flex justify-start flex-wrap mt-10">
          {news !== null ? (
            news.map((news, index) => {
              return (
                <AnnouncementCard
                  key={index + news.id}
                  to="/news/"
                  title={news.title}
                  date={news.date.toDate()}
                  description={news.description}
                  id={news.id}
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

export default Novel;
