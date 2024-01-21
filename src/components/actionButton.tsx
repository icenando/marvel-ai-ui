"use client";

import styles from "../styles/page.module.scss";

// TODO: this will come from the session once implemented
// const [isLoggedIn, setLoggedIn] = useState(true);
const toggleLoggedIn = () => {
  console.log("will logout once implemented");
};

export const ActionButton = () => {
  const actionBtnText = true ? "SIGN OUT" : "SIGN IN TO POST";
  const actionBtnStyle = true
    ? styles.commentsList__header__logout_button
    : styles.commentsList__header__login_button;

  return (
    <button className={actionBtnStyle} onClick={() => toggleLoggedIn()}>
      {actionBtnText}
    </button>
  );
};
