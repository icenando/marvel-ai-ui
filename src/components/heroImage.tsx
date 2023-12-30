import Image from "next/image";
import styles from "../styles/page.module.scss";

interface HeroImageProps {
  imageUrl: string;
  description: string;
}
export const HeroImage = ({ imageUrl, description }: HeroImageProps) => {
  return (
    <Image
      src={imageUrl}
      alt={description}
      priority
      className={styles.hero_image}
      height={750}
      width={750}
    />
  );
};
