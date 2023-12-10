import styles from "./page.module.scss";
import { MainSection } from "@/app/(mainSection)/[mainSection]";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div>CARAVARVEL-AI</div>
        <span>
          <div>ABOUT</div>
          <div>CONTACT</div>
        </span>
      </header>
      <MainSection />
    </>
  );
}
