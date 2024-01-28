"use client";

import { useFormStatus } from "react-dom";
import styles from "../styles/page.module.scss";

type PostButtonProps = {
  reset: () => void;
};
const PostButtons = ({ reset }: PostButtonProps) => {
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
      <button
        className={styles.comment__textArea__resetBtn}
        type="reset"
        onClick={() => reset()}
      >
        Clear
      </button>
    </>
  );
};

export default PostButtons;
