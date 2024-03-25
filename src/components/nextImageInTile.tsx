"use client";

import { useGetTimeToNextImage } from "@/helpers/getTimeToNextImage";
import styles from "../app/archive/archive.module.scss";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useEffect } from "react";

export const NextImageInTile = () => {
  const timeToNewImage = useGetTimeToNextImage();

  const router = useRouter();

  useEffect(() => {
    if (timeToNewImage.split(":")[2].endsWith("0")) {
      const protocol = window.location.protocol;
      const host = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : "";
      const baseUrl = `${protocol}//${host}${port}`;
      const endpoint = `${baseUrl}/api/revalidate`;

      fetch(endpoint).then(() => router.refresh());
    }
  }, [router, timeToNewImage]);

  return (
    <div className={styles.thumbs_section_coming_next}>
      {`New image in \n${timeToNewImage}`}
    </div>
  );
};
