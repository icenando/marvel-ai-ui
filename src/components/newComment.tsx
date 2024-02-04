"use client";

import { useState } from "react";
import styles from "../styles/page.module.scss";
import PostButtons from "./postButtons";
import { useFormState } from "react-dom";
import { submitComment } from "@/api/formActions";
import { UniqueUser, UserInfo } from "@/types/types";
import { MentionsInput, Mention } from "react-mentions";

type NewCommentSectionProps = {
  eventId: number;
  userInfo: UserInfo;
  users: UniqueUser[];
};
export const NewCommentSection = ({
  eventId,
  userInfo,
  users,
}: NewCommentSectionProps) => {
  const maxChars = 200;
  const [charsEntered, setCharsEntered] = useState("");

  const reset = () => {
    setCharsEntered("");
  };

  const [state, formAction] = useFormState(submitComment, null);

  const [isTextareaDisabled, setIsTextareaDisabled] = useState(false);

  return (
    <form action={formAction} onSubmit={reset}>
      <input type="hidden" name="eventId" value={eventId} />
      <input type="hidden" name="username" value={userInfo.username} />
      <input type="hidden" name="userId" value={userInfo.userId} />
      <input
        type="hidden"
        name="profilePicture"
        value={userInfo.profilePicture}
      />
      <div className={styles.comment__container}>
        <div className={styles.comment__textArea__container}>
          {state}
          {/* <textarea
            className={styles.comment__textArea}
            name="comment"
            required
            minLength={1}
            maxLength={maxChars}
            aria-label="comment input field"
            onChange={e => setCharsEntered(e.target.value)}
            value={charsEntered}
            disabled={isTextareaDisabled}
          /> */}
          <MentionsInput
            className={styles.comment__textArea}
            placeholder={"Mention people using '@'"}
            name="comment"
            required
            minLength={1}
            maxLength={maxChars}
            aria-label="comment input field"
            onChange={e => setCharsEntered(e.target.value)}
            value={charsEntered}
            disabled={isTextareaDisabled}
          >
            <Mention trigger="@" data={users} />
          </MentionsInput>
          <div className={styles.comment__textArea__characterCount}>
            {charsEntered.length} / {maxChars}
          </div>
        </div>
        <PostButtons
          reset={reset}
          setIsTextareaDisabled={setIsTextareaDisabled}
        />
      </div>
    </form>
  );
};
