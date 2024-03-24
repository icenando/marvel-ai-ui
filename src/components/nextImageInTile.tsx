"use client";

import { useGetTimeToNextImage } from "@/helpers/getTimeToNextImage";
import styles from "../app/archive/archive.module.scss";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export const NextImageInTile = () => {
  const timeToNewImage = useGetTimeToNextImage();

  const router = useRouter();
  if (timeToNewImage === "00:00:00") {
    revalidatePath("/archive");
    router.refresh();
  }

  return (
    <div className={styles.thumbs_section_coming_next}>
      {`New image in \n${timeToNewImage}`}
    </div>
  );
};
