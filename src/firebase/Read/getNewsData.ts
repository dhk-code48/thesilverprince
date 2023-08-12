"use client";

import { db } from "@/lib/firebaseConfig";
import { toast } from "@/lib/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { newsProps } from "./getNews";

const useNewsData = (id: string) => {
  const [news, setNews] = useState<newsProps | null>(null);
  const ref = doc(db, "Announcements", id);
  const route = useRouter();

  useEffect(() => {
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
  }, [id, ref, route]);
  return news;
};

export default useNewsData;
