import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
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

export default Header;
