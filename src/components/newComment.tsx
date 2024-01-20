import { useState } from "react";
import styles from "../styles/page.module.scss";

type NewCommentSectionProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
export const NewCommentSection = ({ onSubmit }: NewCommentSectionProps) => {
  const maxChars = 200;
  const [charsEntered, setCharsEntered] = useState("");
  return (
    <form
      onSubmit={e => {
        onSubmit(e);
        setCharsEntered("");
      }}
    >
      <div className={styles.comment__container}>
        <div className={styles.comment__textArea__container}>
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
        <button className={styles.comment__textArea__submitBtn} type="submit">
          Post
        </button>
        <button
          className={styles.comment__textArea__resetBtn}
          type="reset"
          onClick={() => setCharsEntered("")}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
