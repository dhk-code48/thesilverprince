"use client";

import { newsProps } from "@/firebase/Read/getNews";
import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";

import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { LuCalendar } from "react-icons/lu";

interface newspageProps {
  params: {
    newsId: string;
  };
}

const News: FC<newspageProps> = ({ params }) => {
  const [news, setNews] = useState<newsProps | null>(null);
  const route = useRouter();

  useEffect(() => {
    const ref = doc(db, "Announcements", params.newsId);

    async function getNews() {
      const doc = await getDoc(ref);
      if (doc.exists()) {
        const data = doc.data();
        setNews({
          content: data.content,
          description: data.description,
          date: data.publishedOn,
          id: doc.id,
          state: data.state,
          title: data.title,
          publishedOn: data.publishedOn,
        });
      } else {
        toast({
          title: "Not Available !!",
          description: "Sorry the data you are searching is not available",
          variant: "destructive",
        });
        route.push("/news");
      }
    }
    getNews();
  }, [params.newsId, route]);

  useEffect(() => {
    if (news) {
      const { title, description } = news;
      document.title = title;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    }
  }, [news]);

  return (
    <div className="min-h-[calc(100vh-80px)] dark:bg-paper bg-white lg:w-[900px] mx-auto p-10 rounded-lg">
      {news !== null ? (
        <>
          <Head>
            <title>{news.title} | The SilverPrince</title>
            <meta name="description" content={news.description}></meta>
          </Head>
          <h1 className="text-2xl font-bold tracking-wide">{news.title}</h1>
          <p className="text-muted-foreground text-sm mt-1 flex gap-2 items-center">
            <LuCalendar />
            {news.date.toDate().getFullYear() +
              " / " +
              news.date.toDate().getMonth() +
              " / " +
              news.date.toDate().getDay()}
          </p>
          <p
            className="text-muted-foreground mt-5"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
          <p
            className="mt-10"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </>
      ) : (
        <div className="w-full h-full justify-center items-center">
          <AiOutlineLoading size={30} className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default News;
