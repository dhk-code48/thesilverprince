import Navbar from "@/components/App/Navbar/Navbar";
import "../styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TheSilverPrince",
  description:
    "Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He is a light novel writer and has been writing since 2019. He is famous for his novel ‘Pokemon- a real story’ which has been published in webnovels, Fanfiction.net and AO3.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-100 dark:bg-background"}>
        <Head>
          <meta property="og:title" content="Your Open Graph Title" />
          <meta
            property="og:description"
            content="Your Open Graph Description"
          />
          <meta
            property="og:image"
            content="https://images2.imgbox.com/78/e5/38mF8Su4_o.png"
          />
          <meta property="og:url" content="https://silver-prince.com/novel" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="The Silver Prince" />
          <meta
            name="twitter:description"
            content="Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He
            is a light novel writer and has been writing since 2019. He is
            famous for his novel ‘Pokemon- a real story’ which has been
            published in webnovels, Fanfiction.net and AO3."
          />
          <meta
            name="twitter:image"
            content="https://images2.imgbox.com/78/e5/38mF8Su4_o.png"
          />
        </Head>

        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            <main className="lg:pt-20 min-h-screen pb-32 lg:pb-0">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
