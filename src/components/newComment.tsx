"use client";

import { useState } from "react";
import styles from "../styles/page.module.scss";
import PostButtons from "./postButtons";
import { useFormState } from "react-dom";
import { revalidatePath } from "next/cache";

type NewCommentSectionProps = {
  userId: string;
  eventId: number;
  username: string;
  profilePicture: string;
};

export const NewCommentSection = ({
  userId,
  eventId,
  username,
  profilePicture,
}: NewCommentSectionProps) => {
  const maxChars = 200;
  const [charsEntered, setCharsEntered] = useState("");
  const reset = () => {
    setCharsEntered("");
  };

  const handleSubmit = async (state: any, formData: FormData) => {
    try {
      const response = await fetch("/api/submitComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          eventId,
          username,
          profilePicture,
          comment: charsEntered,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        reset();

        return result.message;
      } else {
        // Handle non-JSON responses or server errors
        const errorText = await response.text();
        console.error("Server responded with error:", errorText);
        return "Error submitting comment.";
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      return "Error submitting comment.";
    }
  };

  const [message, formAction] = useFormState<any, FormData>(handleSubmit, null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(null, new FormData(e.currentTarget));
  };

  return (
    <form action={formAction} onSubmit={handleFormSubmit}>
      <div className={styles.comment__container}>
        <div className={styles.comment__textArea__container}>
          {message}
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
        <PostButtons />
        <button
          className={styles.comment__textArea__resetBtn}
          type="reset"
          onClick={reset}
        >
          Clear
        </button>
      </div>
    </form>
  );
};
