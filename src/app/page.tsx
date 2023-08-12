"use client";
import AnnouncementCard from "@/components/App/Announcement";
import NovelCard from "@/components/App/Novel/NovelCard";
import BasicSkeleton from "@/components/Skleaton";
import useNews from "@/firebase/Read/getNews";
import useNovels from "@/firebase/Read/getNovels";

export default function Home() {
  const novels = useNovels();
  const news = useNews();
  return (
    <div className="px-5 overflow-hidden mb-24 pt-10 lg:text-center">
      <h1 className="font-display text-2xl text-center text-accent-foreground tracking-wide lg:text-5xl">
        Freedom <br />
        From Reality
      </h1>
      <div className="mt-10 text-center">
        <span className="font-semibold text-sm tracking-wide ">
          Recent Novels
        </span>
        <div className="flex justify-center w-[70%] mx-auto flex-wrap">
          {novels !== null ? (
            novels.map((novel, index) => {
              return (
                <NovelCard
                  key={index + novel.id}
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
      <h1>
        <div className="pt-6 text-center mt-10 lg:w-[1000px] lg:mx-auto">
          <h1 className="text-3xl font-bold text-black-500">Announcements</h1>
          <p className="font-semibold text-sm mt-1 text-slate-400 dark:text-slate-300">
            Recent Announcements
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-20">
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
      </h1>
    </div>
  );
}
