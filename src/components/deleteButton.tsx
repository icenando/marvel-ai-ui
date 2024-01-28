"use client";

import { useFormStatus } from "react-dom";
import styles from "../styles/page.module.scss";

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  const buttonText = pending ? "deleting" : "delete";

  return (
    <div className={styles.commentCard__comment__delete}>
      <button type="submit" aria-disabled={pending} disabled={pending}>
        {buttonText}
      </button>
    </div>
  );
};

export default DeleteButton;
