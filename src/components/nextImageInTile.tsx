"use client";

import { useGetTimeToNextImage } from "@/helpers/getTimeToNextImage";
import styles from "../app/archive/archive.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const NextImageInTile = () => {
  const router = useRouter();
  const timeToNewImage = useGetTimeToNextImage();
  const [countown, setCountdown] = useState(timeToNewImage);

  useEffect(() => {
    const refreshPage = async () => {
      setCountdown("...generating");
      const protocol = window.location.protocol;
      const host = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : "";
      const baseUrl = `${protocol}//${host}${port}`;
      const endpoint = `${baseUrl}/api/revalidate`;

      try {
        await fetch(endpoint);
        router.refresh();
      } catch (error) {
        console.error("Failed to revalidate:", error);
      }
    };

    setCountdown(timeToNewImage);

    if (timeToNewImage === "00:00:00") {
      refreshPage();
    }
  }, [timeToNewImage, router]);

  return (
    <div className={styles.thumbs_section_coming_next}>
      {`New image in \n${countown}`}
    </div>
  );
};
