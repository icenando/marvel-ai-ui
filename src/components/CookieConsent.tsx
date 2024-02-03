"use client";

import styles from "./cookieConsent.module.scss";
import cookieImage from "../resources/cookie.png";
import Image from "next/image";
import { useState } from "react";

const cookieConsent = "caravarvelCookieConsent";

const buildCookie = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);
  const expirationDate = currentDate.toUTCString();

  return `${cookieConsent}=true;expires=${expirationDate};samesite=Strict;Secure;path=/`;
};

const setCookieConsent = () => {
  document.cookie = buildCookie();
};

const CookieConsent = () => {
  const hasCookieConsent = localStorage.getItem(cookieConsent);
  const [hideCookieBanner, setHideCookieBanner] = useState(hasCookieConsent);

  const consentText = (
    <>
      <p>
        This site uses cookies only to keep you signed in in case you want to
        post comments. We do not ever send your information outside of this
        website.
      </p>
      <p>Please accept to continue using the Caravarvel.</p>
    </>
  );
  return (
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
        <button className={styles.agreeButton} onClick={setCookieConsent}>
          I understand
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
