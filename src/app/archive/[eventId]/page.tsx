import { InfoBox } from "@/components/infoBox";
import styles from "../../../styles/page.module.scss";
import { HeroImage } from "@/components/heroImage";
import { EventsResult } from "@/types/dynamoResponse";
import { fetchAllEvents, fetchSingleEvent } from "@/api/db";

// Fecthes all "used" events from DB to create links
// for the [eventId] dynamic path
export const generateStaticParams = async () => {
  const allUsedEvents: EventsResult[] = await fetchAllEvents().then(
    res => res as EventsResult[]
  );

  return allUsedEvents.map(usedEvent => ({ eventId: usedEvent.id.toString() }));
};

const Event = async ({ params }: { params: { eventId: string } }) => {
  const marvelEvent: EventsResult = await fetchSingleEvent(
    parseInt(params.eventId)
  ).then(res => res as EventsResult);

  const bucketName = process.env.BUCKET_NAME;

  return (
    <main className={styles.main}>
      <HeroImage imageUrl={`${bucketName}/${marvelEvent.imgUrl}`} />
      <InfoBox
        title={marvelEvent.title}
        marvelDescription={marvelEvent.description}
        revisedDescription={marvelEvent.revisedPrompt}
        linkToEvent={marvelEvent.url}
      />
    </main>
  );
};

export default Event;
