import { InfoBox } from "@/components/infoBox";
import styles from "../../styles/page.module.scss";
import { HeroImage } from "@/components/heroImage";

import imageSample from "../../../public/resources/154.png";
import dynamoResponse from "../../__fixtures__/dynamo_response.json";

export const MainSection = () => {
  const response = dynamoResponse; // TODO: remove this once staticProps logic done

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
