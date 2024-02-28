import Image from "next/image";
import styles from "./archive.module.scss";
import Link from "next/link";
import { EventsResult } from "@/types/types";
import { fetchAllEvents } from "@/api/db";
// import { getTimeToNextImage } from "@/helpers/getTimeToNextImage";

const Archive = async () => {
  const marvelEvents: EventsResult[] = await fetchAllEvents().then(
    res => res as EventsResult[]
  );

  const bucketName = process.env.BUCKET_NAME;

  const thumbs_section = marvelEvents.reverse().map(event => {
    const { id, imgUrl, description, title } = event;

    return (
      <Link href={`archive/${id}`} key={id}>
        <div className={styles.thumbs_section_title}>{title}</div>
        <Image
          src={`${bucketName}/${imgUrl}`}
          alt={description}
          priority
          className={styles.thumbs_section_image}
          height={350}
          width={350}
        />
      </Link>
    );
  });
  return (
    <div className={styles.archive}>
      <p className={styles.archive__title}>ARCHIVE</p>
      <div className={styles.thumbs_section}>
        <div className={styles.thumbs_section_coming_next}>
          New image everyday at 10am GMT
          {/* TODO {getTimeToNextImage()} */}
        </div>
        {thumbs_section}
      </div>
    </div>
  );
};

export default Archive;
