import { InfoBox } from "@/components/infoBox";
import styles from "../../styles/page.module.scss";
import { HeroImage } from "@/components/heroImage";
import { EventsResult } from "@/types/dynamoResponse";
import { fetchAllEvents } from "@/api/db";

export const MainSection = async () => {
  const marvelEvents: EventsResult[] = await fetchAllEvents().then(
    res => res as EventsResult[]
  );

  const todaysImage = marvelEvents.reverse()[0];

  const bucketName = process.env.BUCKET_NAME;

  return (
    <main className={styles.main}>
      <HeroImage imageUrl={`${bucketName}/${todaysImage.imgUrl}`} />
      <InfoBox
        title={todaysImage.title}
        marvelDescription={todaysImage.description}
        revisedDescription={todaysImage.revisedPrompt}
        linkToEvent={todaysImage.url}
      />
    </main>
  );
};
