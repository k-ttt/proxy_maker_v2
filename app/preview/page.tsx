"use client";

import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import style from "./page.module.css";
import "./page.module.css";

export default function Preview() {
  const { proxies } = useStateContext();
  const [printProxyUrls, setPrintProxyUrls] = useState<string[][]>([]);

  useEffect(() => {
    const urls = proxies
      .filter((proxy) => !!proxy.url)
      .map((proxy) => {
        const result = [];
        for (let i = 0; i < proxy.count; i++) {
          result.push(proxy.url);
        }
        return result;
      })
      .flat();
    const newPrintProxyUrls = [];
    let line = [];
    for (let i = 0; i < urls.length; i++) {
      line.push(urls[i]);
      if (line.length === 3 || i === urls.length - 1) {
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
          {line.map((url, i) => (
            <div key={`Image ${i}`} className={style.imgBlock}>
              <img src={url} alt={`Image ${i}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
