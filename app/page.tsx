"use client";

import styles from "./page.module.css";
import headerStyles from "./header.module.css";
import { useStateContext } from "./context/StateContext";
import Link from "next/link";
import config from "../next.config";
const BASE_PATH = config.basePath ?? "";

export default function Home() {
  const { count, proxies, setCount, setProxies } = useStateContext();

  const handleInputChange = (index: number, value: string) => {
    const newProxies = [...proxies];
    newProxies[index] = { url: value, count: 1 };
    setProxies(newProxies);
  };

  const handleSelectChange = (index: number, value: number) => {
    const newProxies = [...proxies];
    newProxies[index] = { ...newProxies[index], count: value };
    setProxies(newProxies);
  };

  const handleAddClick = () => {
    setCount(count + 10);
    setProxies([...proxies, ...Array(10).fill({ url: "", count: 0 })]);
  };

  const handleRemoveClick = () => {
    setCount(count - 10);
    setProxies(proxies.slice(0, proxies.length - 10));
  };

  return (
    <div>
      <header>
        <div className={headerStyles.logo}>
          <img src={`${BASE_PATH}/logo.png`} alt="logo" />
        </div>
        <div>
          <p className={headerStyles.title}>TCGプロキシメーカー var.2</p>
        </div>
      </header>
      <div className={styles.captionArea}>
        <div>
          <p>使い方</p>
          <p>1. カードの画像URLを入力（画像が表示されたらOK）</p>
          <p>2. 作成枚数を選択（最大4枚）</p>
          <p>3. 印刷プレビューボタンで印刷用画面を表示</p>
          <p>4. 画面をPDFで保存</p>
        </div>
      </div>
      <div className={styles.inputArea}>
        {proxies.map((proxy, i) => (
          <div key={i} className={styles.inputBlock}>
            <label>{i + 1}枚目</label>
            <input
              type="text"
              placeholder="画像URL"
              value={proxy.url || ""}
              onChange={(e) => handleInputChange(i, e.target.value)}
              onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                const files = e.clipboardData.files;
                if (files.length === 0) {
                  return;
                }
                handleInputChange(i, URL.createObjectURL(files[0]));
                e.preventDefault();
              }}
            />
            {proxy.url ? (
              <select
                value={proxy.count}
                onChange={(e) => handleSelectChange(i, Number(e.target.value))}
              >
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
              </select>
            ) : (
              <div className={styles.blankCount}>0</div>
            )}
            枚
            {proxy.url ? (
              <img src={proxy.url} alt={`Image ${i + 1}`} />
            ) : (
              <div className={styles.blankImg} />
            )}
          </div>
        ))}
        <div className={styles.actionBar}>
          <div onClick={handleAddClick}>
            <img src={`${BASE_PATH}/plus.png`} alt="Add" />
            追加
          </div>
          {count > 10 && (
            <div onClick={handleRemoveClick}>
              <img src={`${BASE_PATH}/delete.png`} alt="Remove" />
              削除
            </div>
          )}
        </div>
      </div>
      <Link href="/preview" className={styles.previewArea}>
        <button>印刷プレビュー</button>
      </Link>
      <footer style={{ height: "20px", textAlign: "center", fontSize: "10px" }}>
        © 2024 Magigori
      </footer>
    </div>
  );
}
