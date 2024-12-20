"use client";

import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import style from "./page.module.css";
import "./page.module.css";

type Image = {
  url: string;
  isCircular: boolean;
};

export default function Preview() {
  const { proxies } = useStateContext();
  const [printProxyUrls, setPrintProxyUrls] = useState<Image[][]>([]);

  useEffect(() => {
    const images = proxies
      .filter((proxy) => !!proxy.url)
      .map((proxy) => {
        const result = [];
        for (let i = 0; i < proxy.count; i++) {
          result.push({ url: proxy.url, isCircular: proxy.isCircular });
        }
        return result;
      })
      .flat();
    const newPrintProxyUrls = [];
    let line = [];
    for (let i = 0; i < images.length; i++) {
      line.push(images[i]);
      if (line.length === 3 || i === images.length - 1) {
        newPrintProxyUrls.push(line);
        line = [];
      }
    }
    setPrintProxyUrls(newPrintProxyUrls);
  }, [proxies]);

  return (
    <div>
      {printProxyUrls.map((line, i) => (
        <div key={`Line ${i}`} className={style.lineBlock}>
          {line.map((image, i) => (
            <div
              key={`Image ${i}`}
              className={[
                style.imgBlock,
                `${image.isCircular ? style.circular : ""}`,
              ].join(" ")}
            >
              <img src={image.url} alt={`Image ${i}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
