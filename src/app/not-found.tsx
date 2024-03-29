import Image from "next/image";
import notFound from "./../assets/404.png";
import styles from "./not-found.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFound__container}>
      <h2 className={styles.notFound__title}>Not Found</h2>
      <Image
        className={styles.notFound__img}
        src={notFound}
        alt="Not-Found page image"
        height={500}
        width={500}
      />
    </div>
  );
};

export default NotFound;
