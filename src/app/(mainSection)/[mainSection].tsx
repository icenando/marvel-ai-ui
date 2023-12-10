import { InfoBox } from "@/components/infoBox";
import styles from "../page.module.scss";
import { HeroImage } from "@/components/heroImage";

export const MainSection = () => {
  return (
    <main className={styles.main}>
      <HeroImage />
      <InfoBox />
    </main>
  );
};
