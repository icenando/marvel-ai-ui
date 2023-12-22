import Image from "next/image";
import styles from "../../styles/page.module.scss";
import Link from "next/link";
import { EventsResult } from "@/types/dynamoResponse";
import { fetchAllEvents } from "@/api/db";

const Archive = async () => {
  const marvelEvents: EventsResult[] = await fetchAllEvents().then(res => {
    return res as EventsResult[];
  });

  const bucketName = process.env.BUCKET_NAME;

  const thumbs_section = marvelEvents.map(event => {
    return (
      <Link href={`archive/${event.id}`} key={event.id}>
        <Image
          src={`${bucketName}/${event.imgUrl}`}
          alt={event.description}
          priority
          className={styles.thumbs_section_image}
          height={350}
          width={350}
        />
      </Link>
    );
  });
  return <div className={styles.thumbs_section}>{thumbs_section}</div>;
};

export default Archive;
