import type { Metadata } from "next";
import { Mochiy_Pop_One } from "next/font/google";
import "./globals.css";
import { StateProvider } from "./context/StateContext";

const mochiyPopOne = Mochiy_Pop_One({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TCGプロキシメーカーV2",
  description: "Create TCG proxies pdf file.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={mochiyPopOne.className}>
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
