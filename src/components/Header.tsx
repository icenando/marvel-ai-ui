import Link from "next/link";
import styles from "../styles/page.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={"/"}>CARAVARVEL-AI</Link>
      <span>
        <Link href={"/archive"}>ARCHIVE</Link>
        <Link href={"/about"}>ABOUT</Link>
        <Link href={"/contact"}>CONTACT</Link>
      </span>
    </header>
  );
};
