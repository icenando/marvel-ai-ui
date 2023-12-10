import styles from "../app/page.module.scss";

export const InfoBox = () => {
  return (
    <div className={styles.info_box}>
      <p className={styles.info_box__attribute}>EVENT TITLE</p>
      <p className={styles.info_box__value}>asdfasffdf</p>
      <p className={styles.spacer}></p>
      <p className={styles.info_box__attribute}>MARVEL DESCRIPTION</p>
      <p className={styles.info_box__value}>asdfasffdf</p>
      <p className={styles.spacer}></p>
      <p className={styles.info_box__attribute}>DALL-E REVISED DESCRIPTION</p>
      <p className={styles.info_box__value}>asdfasffdf</p>
      <p className={styles.spacer}></p>
      <p className={styles.info_box__link_to_event}>
        SEE MARVEL EVENT AT MARVEL.COM
      </p>
      <p className={styles.info_box__attribution_text}>
        Data provided by Marvel. © 2014 Marvel
      </p>
      <p className={styles.spacer}></p>
      <div className={styles.info_box__navigation}>
        <p>{"<< PREVIOUS"}</p>
        <p>{"NEXT >>"}</p>
      </div>
    </div>
  );
};
