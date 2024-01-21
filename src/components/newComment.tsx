"use client";

import { useState } from "react";
import styles from "../styles/page.module.scss";
import { addCommentForEvent } from "@/api/db";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";

type NewCommentSectionProps = {
  eventId: number;
};
export const NewCommentSection = ({ eventId }: NewCommentSectionProps) => {
  // TODO: this will come from the signin context
  const username = faker.internet.userName();
  const userId = faker.string.uuid();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment") as string;
    const commentId = `${userId}_${uuid()}`;
    addCommentForEvent({
      eventId,
      commentId,
      comment,
      userId,
      username,
    });
  };

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
