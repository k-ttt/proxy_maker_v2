import React from "react";

import styles from "./cardPreview.module.css";

type Props = {
  showCard: string;
  handleClose: () => void;
};

export default function CardPreview({ showCard, handleClose }: Props) {
  return (
    <div className={styles.cardModal} onClick={handleClose}>
      <div className={styles.cardModalContent}>
        <img src={showCard} alt="Card" />
      </div>
    </div>
  );
}
