"use client";

import { newsProps } from "@/firebase/Read/getNews";
import { db } from "@/lib/firebaseConfig";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import AnnouncementCard from "../App/Announcement";
import { AdminErrorState } from "../Admin/ErrorState";

const LandingNews = () => {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Announcements</h3>
        <Link href="/news" className="text-red-600 hover:underline">
          View all
        </Link>
      </div>
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
  );
};

export default LandingNews;
