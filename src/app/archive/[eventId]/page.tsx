import { InfoBox } from "@/components/infoBox";
import styles from "../page.module.scss";
import { HeroImage } from "@/components/heroImage";
import imageSample from "../../../public/resources/154.png";
import dynamoResponse from "../../../__fixtures__/dynamo_response.json";
import { DynamoResponse } from "@/types/dynamoResponse";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

// for the [eventId] dynamic path
export const generateStaticParams = async () => {
  const allUsedEvents = await queryDB().then(res => res.json());

  return {
    paths: allUsedEvents.map((usedEvent: DynamoResponse) => {
      params: {
        eventId: usedEvent.id.toString();
      }
    }),
  };
};

// uses URL param to get the actual object at this path
export const getStaticProps = (async ({ params }) => {
  const marvelEvent: DynamoResponse = await queryDB(params.id).then(res =>
    res.json()
  );

  return {
    props: {
      marvelEvent,
    },
  };
}) satisfies GetStaticProps<{
  marvelEvent: DynamoResponse;
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
