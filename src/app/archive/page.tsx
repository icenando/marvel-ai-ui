import Image, { StaticImageData } from "next/image";
import styles from "../page.module.scss";
import Link from "next/link";
import imageSample from "../../../public/resources/154.png";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { EventsResult } from "@/types/dynamoResponse";
import { fetchAllEvents } from "@/middleware/db";

// Get all "used" documents from DynamoDB, fetches thumbs from S3 bucket as static prop
//
export const getStaticProps = (async () => {
  const marvelEvents: EventsResult[] = await fetchAllEvents().then(res =>
    res.json()
  );

  return {
    props: {
      marvelEvents: marvelEvents,
    },
  };
}) satisfies GetStaticProps<{
  marvelEvents: EventsResult[];
}>;

interface ArchiveProps {
  thumbs: string[];
}
const Archive = ({
  marvelEvents,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const thumbs = [imageSample, imageSample, imageSample, imageSample];
  const thumbs_section = marvelEvents.map(event => {
    return (
      <Link href={"/"} key={event.id}>
        <Image
          src={event.imgUrl}
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
