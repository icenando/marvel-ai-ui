"use client";

import { useFormStatus } from "react-dom";
import styles from "./commentsList.module.scss";

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  const buttonText = pending ? "deleting" : "delete";

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={styles.commentCard__deleteBtn}
    >
      {buttonText}
    </button>
  );
};

export default DeleteButton;
