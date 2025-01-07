import type { Metadata } from "next";
import { Mochiy_Pop_One } from "next/font/google";
import "./globals.css";
import { ProxiesProvider } from "./_contexts/Proxies";
import config from "../next.config";
const BASE_PATH = config.basePath ?? "";

const mochiyPopOne = Mochiy_Pop_One({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TCGプロキシメーカーV2",
  description: "Create TCG proxies pdf file.",
  icons: {
    icon: `${BASE_PATH}/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={mochiyPopOne.className}>
        <ProxiesProvider>{children}</ProxiesProvider>
      </body>
    </html>
  );
}
