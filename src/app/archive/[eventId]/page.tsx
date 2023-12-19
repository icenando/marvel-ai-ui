import { InfoBox } from "@/components/infoBox";
import styles from "../page.module.scss";
import { HeroImage } from "@/components/heroImage";
import imageSample from "../../../public/resources/154.png";
import dynamoResponse from "../../../__fixtures__/dynamo_response.json";
import { EventsResult } from "@/types/dynamoResponse";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { fetchAllEvents, fetchSingleEvent } from "@/middleware/db";

// for the [eventId] dynamic path
export const generateStaticParams = async () => {
  const allUsedEvents: EventsResult[] = await fetchAllEvents().then(res =>
    res.json()
  );

  return {
    paths: allUsedEvents.map(usedEvent => {
      return {
        params: {
          eventId: usedEvent.id.toString(),
        },
      };
    }),
  };
};

// uses URL param to get the actual object at this path
export const getStaticProps = (async ({ params }) => {
  const marvelEvent: EventsResult = await fetchSingleEvent(
    params!.id as string
  ).then(res => res.json());

  return {
    props: {
      marvelEvent,
    },
  };
}) satisfies GetStaticProps<{
  marvelEvent: EventsResult;
}>;

const Event = ({
  marvelEvent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className={styles.main}>
      <HeroImage imageUrl={marvelEvent.imgUrl} />
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
