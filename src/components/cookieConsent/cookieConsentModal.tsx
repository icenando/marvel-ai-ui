"use client";

import styles from "./cookieConsent.module.scss";
import cookieImage from "../../assets/cookie.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { hasCookieConsent, setCookieConsent } from "./helpers";

const CookieConsentModal = () => {
  const [hideCookieBanner, setHideCookieBanner] = useState(true);

  useEffect(() => {
    if (!hasCookieConsent()) {
      setHideCookieBanner(false);
    }
  }, []);

  const handleAcceptCookie = () => {
    setCookieConsent();
    setHideCookieBanner(true);
  };

  const consentText = (
    <>
      <p>
        This site uses cookies only to handle signing and and out for posting
        comments. We never send your information outside of this website, nor
        use it for anything else.
      </p>
      <p>Please accept to continue using the Caravarvel.</p>
    </>
  );

  return (
    !hideCookieBanner && (
      <div className={styles.container}>
        <div className={styles.message__container}>
          <Image
            className={styles.cookieImage}
            src={cookieImage}
            alt="cookie consent image"
            height={50}
            width={50}
          />
          <div className={styles.message}>{consentText} </div>
          <button className={styles.agreeButton} onClick={handleAcceptCookie}>
            I understand
          </button>
        </div>
      </div>
    )
  );
};

export default CookieConsentModal;
