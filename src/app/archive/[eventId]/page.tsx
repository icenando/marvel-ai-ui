import { InfoBox } from "@/components/infoBox";
import styles from "../../../styles/page.module.scss";
import { HeroImage } from "@/components/heroImage";
import { EventsResult } from "@/types/types";
import { fetchAllEvents, fetchSingleEvent } from "@/api/db";
import { CommentsList } from "@/components/commentsList";

// If set to true, will fetch ungenerated path on demand. Otherwise, return 404.
export const dynamicParams = false;

// Create links for the [eventId] dynamic path for all used events in DB
export const generateStaticParams = async () => {
  const allUsedEvents: EventsResult[] = await fetchAllEvents().then(
    res => res as EventsResult[]
  );

  return allUsedEvents.map(usedEvent => ({ eventId: usedEvent.id.toString() }));
};

const Event = async ({ params }: { params: { eventId: string } }) => {
  const { eventId } = params;
  const marvelEvent: EventsResult = await fetchSingleEvent(
    parseInt(eventId)
  ).then(res => res as EventsResult);

  const bucketName = process.env.BUCKET_NAME;

  const { imgUrl, title, description, revisedPrompt, url } = marvelEvent;

  return (
    <>
      <main className={styles.main}>
        <HeroImage
          imageUrl={`${bucketName}/${imgUrl}`}
          description={description}
        />
        <InfoBox
          title={title}
          marvelDescription={description}
          revisedDescription={revisedPrompt}
          linkToEvent={url}
        />
      </main>
      <CommentsList />
    </>
  );
};

export default Event;
