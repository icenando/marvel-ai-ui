import styles from "./contact.module.scss";

const Contact = () => {
  const email_address = "caravarvel.ai@gmail.com";
  return (
    <div className={styles.contact}>
      <p className={styles.contact__title}>CONTACT</p>
      <p className={styles.spacer}></p>
      <a href={`mailto:${email_address}`} className={styles.contact__email}>
        <p>{email_address}</p>
      </a>
    </div>
  );
};

export default Contact;
