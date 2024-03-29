import { EventsResult } from "@/types/types";
import { fetchAllEvents } from "@/api/db";
import { HeroImage } from "@/components/heroImage";
import { InfoBox } from "@/components/infoBox";
import styles from "../styles/page.module.scss";
import { CommentsSection } from "@/components/commentsSection";

export default async function Home() {
  const marvelEvents: EventsResult[] = await fetchAllEvents().then(
    res => res as EventsResult[]
  );

  const todaysImage = marvelEvents.reverse()[0];

  const { dateUpdated, id, imgUrl, title, description, revisedPrompt, url } =
    todaysImage;

  const bucketName = process.env.BUCKET_NAME;

  return (
    <>
      <main className={styles.main}>
        <HeroImage
          imageUrl={`${bucketName}/${imgUrl}`}
          description={description}
        />
        <div className={styles.main__rightSideColumn}>
          <InfoBox
            date={dateUpdated}
            title={title}
            marvelDescription={description}
            revisedDescription={revisedPrompt}
            linkToEvent={url}
          />
          <CommentsSection eventId={id} />
        </div>
      </main>
    </>
  );
}
