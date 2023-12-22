import { MarvelAttributionText } from "@/components/marvelAttribution";
import styles from "../../styles/page.module.scss";

const About = () => {
  const aboutText = (
    <p className={styles.about__text}>
      <p>
        Caravarvel-AI (Caravaggio + Marvel + AI) is a personal project that uses
        <a href="https://developer.marvel.com/" target="_blank">
          {" "}
          Marvel&#39;s Developer API
        </a>{" "}
        to retrieve data about their events (like sagas).
      </p>
      <p className={styles.spacer}></p>
      <p>
        The description for each event is then sent to{" "}
        <a href="https://openai.com/dall-e-3">Dall-E</a> (OpenAI&#39;s image
        creation model) with the following prompt:
      </p>
      <p className={styles.spacer}></p>
      <p className={styles.about__prompt}>
        &#34;Create a Caravaggio style painting based on the following prompt,
        ignoring references to the artists who created this story and focusing
        on the summary of the story. Do not include any text in the image&#34;
      </p>
      <p className={styles.spacer}></p>
      <p>followed by the description of the event.</p>
      <p className={styles.spacer}></p>
      <p>
        Sadly, Dall-E &#34;enriches&#34; the prompt by default, meaning that the
        original description is largely changed and, sometimes, the
        &#34;enriched&#34; prompt is very different from the original
        description.
      </p>
      <p className={styles.spacer}></p>
      <p>
        Once Dall-E finishes creating the image from the prompt it returns the
        URL to the image. This is then fetched and the image saved in an S3
        bucket. The address to this bucked is saved in the DB alongside the
        description, title and some other bits of information.
      </p>
    </p>
  );

  return (
    <div className={styles.about}>
      <p className={styles.about__title}>ABOUT</p>
      <p className={styles.about__text}>{aboutText}</p>
      <p className={styles.spacer}></p>
      <MarvelAttributionText />
    </div>
  );
};

export default About;
