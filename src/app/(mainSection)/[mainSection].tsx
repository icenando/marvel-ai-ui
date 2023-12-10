import { InfoBox } from "@/components/infoBox";
import styles from "../page.module.scss";
import { HeroImage } from "@/components/heroImage";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DynamoResponse } from "@/types/dynamoResponse";

import imageSample from "../../../public/resources/154.png";
import dynamoResponse from "../../__fixtures__/dynamo_response.json";

// export const getStaticProps = (async context => {
//   const response = dynamoResponse;
//   console.log(response);
//   return { props: { response } };
// }) satisfies GetStaticProps<{
//   response: DynamoResponse;
// }>;

// export const MainSection = ({
//   response,
// }: InferGetStaticPropsType<typeof getStaticProps>) => {

export const MainSection = () => {
  const response = dynamoResponse;

  return (
    <main className={styles.main}>
      <HeroImage imageUrl={imageSample} />
      <InfoBox
        title={response.title}
        marvelDescription={response.description}
        revisedDescription={response.revisedPrompt}
        linkToEvent={response.url}
      />
    </main>
  );
};
