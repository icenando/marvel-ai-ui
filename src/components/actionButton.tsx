"use client";

import { signIn, signOut } from "next-auth/react";
import styles from "./actionButton.module.scss";
import { Session } from "next-auth";

type ActionButtonProps = {
  session: Session;
};
export const ActionButton = ({ session }: ActionButtonProps) => {
  const actionBtnText = session ? "SIGN OUT" : "SIGN IN TO POST";
  const actionBtnStyle = session ? styles.logout_button : styles.login_button;

  const toggleLoggedIn = () => {
    session ? signOut() : signIn();
  };

  return (
    <button className={actionBtnStyle} onClick={() => toggleLoggedIn()}>
      {actionBtnText}
    </button>
  );
};
