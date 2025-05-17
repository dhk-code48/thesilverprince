import Navbar from "@/components/App/Navbar/Navbar";
import "../styles/global.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";
import Script from "next/script";
import Footer from "@/components/shared/Footer";
import { ModalProvider } from "@/components/shared/modal/modal-provider";
import { ModalContainer } from "@/components/shared/modal/modal-container";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "TheSilverPrince",

  description:
    "Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He is a light novel writer and has been writing since 2019. He is famous for his novel ‘Pokemon- a real story’ which has been published in webnovels, Fanfiction.net and AO3.",
};

export const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {" "}
        <Head>
          <meta property="og:title" content="TheSilverPrince" />
          <meta
            property="og:description"
            content="Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He is a light novel writer and has been writing since 2019. He is famous for his novel ‘Pokemon- a real story’ which has been published in webnovels, Fanfiction.net and AO3."
          />
          <meta property="og:image" content="/banner.jpg" />
          <meta property="og:url" content="https://silver-prince.com/novel" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="./favicon.ico" sizes="any" />
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
          <meta name="twitter:image" content="/banner.jpg" />
        </Head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-N95QH7B521"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-N95QH7B521');
        `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2423639586019217"
          crossOrigin="anonymous"
        ></Script>
        {/* <Head><link rel="icon" href="/favicon.ico" sizes="any" /></Head> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
