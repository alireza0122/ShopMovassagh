import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/styles.scss";
import Layout from "@/app/layout/Layout";
import Script from "next/script";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "وبــ آرا - شرکت طراحی و توسعه سایت",
  description: "start WebSite",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
    <head>
        <link rel="icon" href="/img/Logo.png" />
      <Script
          id="muchat-agent"
          type="module"
          dangerouslySetInnerHTML={{
            __html: `import Chatbox from 'https://cdn.mu.chat/embeds/dist/chatbox/index.js?v=2';
             
   Chatbox.initBubble({
   agentId: 'cmlja0o5o01pxvzmhpyimg5ei',
      });`
          }}
      />
    </head>
      <body
          dir={`rtl`}

        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Layout>
            {children}
      </Layout>
      </body>
    </html>
  );
}
