import styles from "../app/page.module.scss";

interface InfoBoxProps {
  title: string;
  marvelDescription: string;
  revisedDescription: string;
  linkToEvent: string;
  //  TODO: figure out how to receive a previous and next links
}
export const InfoBox = ({
  title,
  marvelDescription,
  revisedDescription,
  linkToEvent,
}: InfoBoxProps) => {
  return (
    <div className={styles.info_box}>
      <p className={styles.info_box__attribute}>EVENT TITLE</p>
      <p className={styles.info_box__value}>{title}</p>
      <p className={styles.spacer}></p>
      <p className={styles.info_box__attribute}>MARVEL DESCRIPTION</p>
      <p className={styles.info_box__value}>{marvelDescription}</p>
      <p className={styles.spacer}></p>
      <p className={styles.info_box__attribute}>DALL-E REVISED DESCRIPTION</p>
      <p className={styles.info_box__value}>{revisedDescription}</p>
      <p className={styles.spacer}></p>
      <a
        href={linkToEvent}
        target="_blank"
        className={styles.info_box__link_to_event}
      >
        SEE EVENT AT MARVEL.COM
      </a>
      <p className={styles.info_box__attribution_text}>
        Data provided by Marvel. © 2014 Marvel
      </p>
      <p className={styles.spacer}></p>
      <div className={styles.info_box__navigation}>
        <p>{"<< PREV"}</p>
        <p>{"NEXT >>"}</p>
      </div>
    </div>
  );
};
