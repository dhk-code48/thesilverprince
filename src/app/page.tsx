"use client";
import AnnouncementCard from "@/components/App/Announcement";
import AppSlider from "@/components/App/AppSlider";
import NovelCard from "@/components/App/Novel/NovelCard";
import BasicSkeleton from "@/components/Skleaton";
import useNews from "@/firebase/Read/getNews";
import useNovels from "@/firebase/Read/getNovels";
import useSlides from "@/firebase/Read/getSlides";

export default function Home() {
  const novels = useNovels();
  const news = useNews();
  return (
    <div className="mb-24 px-5 pt-10 overflow-hidden lg:text-center">
      <AppSlider />
      <h1 className="font-display text-2xl lg:text-5xl text-center tracking-wide text-accent-foreground">
        Freedom <br />
        From Reality
      </h1>
      <div className="mt-10 text-center">
        <span className="font-semibold text-sm tracking-wide">
          Recent Novels
        </span>
        <div className="flex flex-wrap justify-center mx-auto w-[70%]">
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
        <div className="lg:mx-auto mt-10 pt-6 lg:w-[1000px] text-center">
          <h1 className="font-bold text-black-500 text-3xl">Announcements</h1>
          <p className="mt-1 font-semibold text-slate-400 dark:text-slate-300 text-sm">
            Recent Announcements
          </p>
          <div className="flex flex-wrap justify-center gap-20 mt-10">
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
