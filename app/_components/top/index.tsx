"use client";

import { useState } from "react";
import Link from "next/link";
import config from "@/next.config";
const BASE_PATH = config.basePath ?? "";
import styles from "./page.module.css";
import headerStyles from "./header.module.css";
import { useProxiesContext } from "@/app/_contexts/Proxies";
import CardPreview from "../modals/cardPreview";

export default function Top() {
  const {
    count,
    proxies,
    handleInputChange,
    handleCircularChange,
    handleSelectChange,
    handleAddClick,
    handleRemoveClick,
  } = useProxiesContext();
  const [showCard, setShowCard] = useState<string>("");

  const handleShowCard = (cardUrl: string) => {
    setShowCard(cardUrl);
  };

  return (
    <div>
      <header>
        <div className={headerStyles.logo}>
          <img src={`${BASE_PATH}/logo.png`} alt="logo" />
        </div>
        <div>
          <p className={headerStyles.title}>TCGプロキシメーカー ver.2</p>
        </div>
      </header>
      <div className={styles.captionArea}>
        <div>
          <p>使い方</p>
          <p>1. カードの画像URLを入力（画像が表示されたらOK）</p>
          <p>2. 作成枚数を選択（最大10枚）</p>
          <p>3. 画像を90度回転したいものは回転アイコンをチェック</p>
          <p>4. 印刷プレビューボタンで印刷用画面を表示</p>
          <p>5. 画面を印刷（ネットプリントはPDF保存）</p>
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
                {Array(10)
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
            <div
              className={styles.circularButton}
              onClick={() => handleCircularChange(i)}
            >
              <img
                src={`${BASE_PATH}/${
                  proxy.isCircular
                    ? "circularArrow.png"
                    : "circularArrowBlank.png"
                }`}
                alt="Circular"
              />
            </div>
            {proxy.url ? (
              <div
                className={[
                  styles.imgBlock,
                  `${proxy.isCircular ? styles.circular : ""}`,
                ].join(" ")}
                onClick={() => handleShowCard(proxy.url)}
              >
                <img src={proxy.url} alt={`Image ${i + 1}`} />
              </div>
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
      {showCard && (
        <CardPreview showCard={showCard} handleClose={() => setShowCard("")} />
      )}
      <footer style={{ height: "20px", textAlign: "center", fontSize: "10px" }}>
        © 2024 Magigori
      </footer>
    </div>
  );
}
