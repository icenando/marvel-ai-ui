"use client";

import { useFormStatus } from "react-dom";
import styles from "../styles/page.module.scss";

const PostButtons = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        className={styles.comment__textArea__submitBtn}
        type="submit"
        aria-disabled={pending}
        disabled={pending}
      >
        {pending ? "Wait..." : "Post"}
      </button>
    </>
  );
};

export default PostButtons;
