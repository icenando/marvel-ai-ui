"use client";

import { useFormStatus } from "react-dom";
import styles from "../styles/page.module.scss";
import { useEffect } from "react";

type PostButtonProps = {
  reset: () => void;
  setIsTextareaDisabled: (loading: boolean) => void;
};
const PostButtons = ({ reset, setIsTextareaDisabled }: PostButtonProps) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    setIsTextareaDisabled(pending);
  }, [pending, setIsTextareaDisabled]);

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
