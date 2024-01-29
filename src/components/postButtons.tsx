"use client";

import { useFormStatus } from "react-dom";
import styles from "../styles/page.module.scss";

type PostButtonProps = {
  reset: () => void;
  setIsTextareaDisabled: (loading: boolean) => void;
};
const PostButtons = ({ reset, setIsTextareaDisabled }: PostButtonProps) => {
  const { pending } = useFormStatus();
  setIsTextareaDisabled(pending);

  return (
    <>
      <button
        className={styles.comment__textArea__submitBtn}
        type="submit"
        aria-disabled={pending}
        disabled={pending}
      >
        {pending ? "..." : "Post"}
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
