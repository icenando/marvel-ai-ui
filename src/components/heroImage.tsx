import Image, { StaticImageData } from "next/image";
import styles from "../app/page.module.scss";

interface HeroImageProps {
  imageUrl: StaticImageData | string; //TODO: remove StaticImageData once complete
}
export const HeroImage = ({ imageUrl }: HeroImageProps) => {
  return (
    <Image
      src={imageUrl}
      alt={"test"}
      priority
      className={styles.hero_image}
      height={750}
      width={750}
    />
  );
};
