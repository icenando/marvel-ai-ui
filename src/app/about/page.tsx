import styles from "../../styles/page.module.scss";
import Image from "next/image";
import architecture from "../../resources/architecture.png";
import logo from "../../resources/logo.png";

const About = () => {
  const aboutText = (
    <div className={styles.about__text}>
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
        ignoring the artists who created this story if there are any references
        to them. Focus on the summary of the story. Do not include any text in
        the resulting image. Ensure that there are no DC comics characters in
        the resulting image, and that there is racial, gender, physical and
        sexual diversity:&#34;
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
      <p className={styles.spacer}></p>
      <p>
        DISCLAIMER: This is a fan project. It is{" "}
        <i>NOT an official Marvel project nor is it endorsed by Marvel</i>.
      </p>
    </div>
  );

  return (
    <div className={styles.about}>
      <div className={styles.about__title}>ABOUT</div>
      <Image
        className={styles.about__logo}
        src={logo}
        alt={"caravarvel logo"}
        priority
        height={500}
        width={500}
      />
      <div className={styles.about__text}>{aboutText}</div>
      <div className={styles.spacer}></div>
      <div className={styles.about__title}>ARCHITECTURE</div>
      <Image
        className={styles.about__architecture_diagram}
        src={architecture}
        alt={"architecture diagrama"}
        priority
        height={570}
        width={670}
      />
      <p className={styles.spacer}></p>
    </div>
  );
};

export default About;
