"use client";

import { useGetTimeToNextImage } from "@/helpers/getTimeToNextImage";
import styles from "../app/archive/archive.module.scss";

export const NextImageInTile = () => {
  const timeToNewImage = useGetTimeToNextImage();
  return (
    <div className={styles.thumbs_section_coming_next}>
      {`New image in \n${timeToNewImage}`}
    </div>
  );
};
