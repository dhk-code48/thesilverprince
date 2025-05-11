"use client";

import { newsProps } from "@/firebase/Read/getNews";
import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";

import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState, use } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { LuCalendar } from "react-icons/lu";

interface newspageProps {
  params: Promise<{
    newsId: string;
  }>;
}

const News: FC<newspageProps> = (props) => {
  const params = use(props.params);
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
    <div className="bg-white dark:bg-paper mx-auto p-10 rounded-lg lg:w-[900px] min-h-[calc(100vh-80px)]">
      {news !== null ? (
        <>
          <Head>
            <title>{news.title} | The SilverPrince</title>
            <meta name="description" content={news.description}></meta>
          </Head>
          <h1 className="font-bold text-2xl tracking-wide">{news.title}</h1>
          <p className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
            <LuCalendar />
            {news.date.toDate().getFullYear() +
              " / " +
              news.date.toDate().getMonth() +
              " / " +
              news.date.toDate().getDay()}
          </p>
          <p
            className="mt-5 text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />
          <p
            className="mt-10"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </>
      ) : (
        <div className="justify-center items-center w-full h-full">
          <AiOutlineLoading size={30} className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default News;
