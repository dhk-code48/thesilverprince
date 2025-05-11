import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import Head from "next/head";

const About: FC = () => {
  return (
    <div className="pt-10 lg:pt-0">
      <Head>
        <title>About | The Silver Prince | Rahul Manandhar</title>
        <meta
          name="description"
          content="Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He
            is a light novel writer and has been writing since 2019. He is
            famous for his novel ‘Pokemon- a real story’ which has been
            published in webnovels, Fanfiction.net and AO3."
        ></meta>
      </Head>
      <div className="lg:w-[75%] px-5 text-center lg:text-left w-full mx-auto min-h-[calc(100vh-80px)] flex items-center justify-center gap-20 flex-wrap">
        <Image
          src="/author.png"
          width={300}
          height={300}
          className="rounded-[50px] bg-purple-400"
          alt="author profile"
        />
        <div className="lg:w-[50%] w-full overflow-hidden text-slate-800 dark:text-gray-400">
          <h1 className="text-2xl text-foreground font-bold">
            The Silver Prince
          </h1>
          <p className="lg:text-lg mt-2">
            Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He
            is a light novel writer and has been writing since 2019. He is
            famous for his novel ‘Pokemon- a real story’ which has been
            published in webnovels, Fanfiction.net and AO3.
          </p>
          <p className="lg:text-lg mt-2">
            He is a fiction novelist that focuses on fantasy and adventure. A
            fantasy writer who loves to mix his own imagination and game
            elements with his stories. The author wants to dedicate and improve
            the viewer’s reading experience so every time the viewer’s support
            him, The money would go right back to the novel.
          </p>

          <p className="lg:text-lg mt-2">
            You can support the novel in patreon:
            <br />
            <Link
              className="text-blue-500 underline"
              href={"https://www.patreon.com/TheSilverPrince1"}
              target="_blank"
            >
              https://www.patreon.com/TheSilverPrince1
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
