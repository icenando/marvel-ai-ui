import Image, { StaticImageData } from "next/image";
import styles from "../page.module.scss";
import Link from "next/link";
import imageSample from "../../../public/resources/154.png";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

// Get all "used" documents from DynamoDB, fetches thumbs from S3 bucket as static prop
//

interface ArchiveProps {
  thumbs: string[];
}
const Archive = () => {
  const thumbs = [imageSample, imageSample, imageSample, imageSample];
  const thumbs_section = thumbs.map(thumb => {
    return (
      <Link href={"/"} key={thumb.blurDataURL}>
        <Image
          src={thumb}
          alt={"test"}
          priority
          className={styles.thumbs_section_image}
          height={350}
          width={350}
        />
      </Link>
    );
  });
  return <div className={styles.thumbs_section}>{thumbs_section}</div>;
};

export default Archive;
