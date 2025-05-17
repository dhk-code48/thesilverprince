"use client";
import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import AnnouncementCard from "@/components/App/Announcement";
import useNews, { newsProps } from "@/firebase/Read/getNews";
import BasicSkeleton from "@/components/Skleaton";
import Head from "next/head";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { AdminErrorState } from "@/components/Admin/ErrorState";

const News: FC = () => {
  const ref = query(
    collection(db, "Announcements"),
    orderBy("publishedOn", "desc")
  );
  const { data, isLoading, error } = useCollectionQuery(ref, {
    queryKey: ["News"],
  });

  const news: newsProps[] | undefined = data?.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as newsProps)
  );
  return (
    <MaxWidthWrapper className="my-10">
      <Head>
        <title>TheSilverPince | News</title>
      </Head>
      <div className="space-y-10 rounded-xl">
        {/* <Input placeholder="Search News..." /> */}
        <p className="font-semibold text-3xl text-center">Announcements</p>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {error ? (
            <AdminErrorState title="Unexpected Error!" />
          ) : isLoading ? (
            [1, 2, 3, 4].map((index) => (
              <AnnouncementCard
                key={index}
                to="#"
                title=""
                date={new Date()}
                description=""
                id=""
              />
            ))
          ) : (
            news?.map((news, index) => {
              return (
                <AnnouncementCard
                  key={index + news.id}
                  to="/news/"
                  title={news.title}
                  date={news.publishedOn.toDate()}
                  description={news.description}
                  id={news.id}
                />
              );
            })
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default News;
