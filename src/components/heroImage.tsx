import imageSample from "../../public/resources/154.png";
import Image from "next/image";
import styles from "../app/page.module.scss";

export const HeroImage = () => {
  return (
    <Image
      src={imageSample}
      alt={"test"}
      priority
      className={styles.hero_image}
      height={750}
      width={750}
    />
  );
};
