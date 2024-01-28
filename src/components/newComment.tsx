"use client";

import { useState } from "react";
import styles from "../styles/page.module.scss";
import PostButtons from "./postButtons";
import { useFormState } from "react-dom";

type NewCommentSectionProps = {
  onSubmit: (
    state: any,
    formData: FormData
  ) => Promise<"Failed moderation" | "Success">;
};
export const NewCommentSection = ({ onSubmit }: NewCommentSectionProps) => {
  const maxChars = 200;
  const [charsEntered, setCharsEntered] = useState("");

  const reset = () => {
    setCharsEntered("");
  };

  const [state, formAction] = useFormState(onSubmit, null);

  return (
    <form action={formAction} onSubmit={reset}>
      <div className={styles.comment__container}>
        <div className={styles.comment__textArea__container}>
          {state}
          <textarea
            className={styles.comment__textArea}
            name="comment"
            required
            minLength={1}
            maxLength={maxChars}
            aria-label="comment input field"
            onChange={e => setCharsEntered(e.target.value)}
            value={charsEntered}
          />
          <div className={styles.comment__textArea__characterCount}>
            {charsEntered.length} / {maxChars}
          </div>
        </div>
        <PostButtons reset={reset} />
      </div>
    </form>
  );
};
