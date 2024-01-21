"use client";

import { signIn, signOut } from "next-auth/react";
import styles from "../styles/page.module.scss";
import { Session } from "next-auth";

// TODO: this will come from the session once implemented
// const [isLoggedIn, setLoggedIn] = useState(true);

type ActionButtonProps = {
  session: Session;
};
export const ActionButton = ({ session }: ActionButtonProps) => {
  const actionBtnText = session ? "SIGN OUT" : "SIGN IN TO POST";
  const actionBtnStyle = session
    ? styles.commentsList__header__logout_button
    : styles.commentsList__header__login_button;

  const toggleLoggedIn = () => {
    session ? signOut() : signIn();
  };

  return (
    <button className={actionBtnStyle} onClick={() => toggleLoggedIn()}>
      {actionBtnText}
    </button>
  );
};
