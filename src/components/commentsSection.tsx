"use client";

import { useComment } from "@/app/api/useComments";
import styles from "../styles/page.module.scss";
import { useState } from "react";
// import { v4 as uuid } from "uuid";

export const CommentsSection = (): JSX.Element => {
  const { comments, addComment, editComment, deleteComment } = useComment();

  const CommentsList = () =>
    comments.map(comment => {
      return (
        <div key={comment.commentId} className={styles.commentCard}>
          <div className={styles.commentCard__username}>{comment.username}</div>
          <div className={styles.commentCard__options}>
            <div className={styles.commentCard__comment__edit}>edit</div>
            <div
              className={styles.commentCard__comment__delete}
              id={comment.commentId}
              onClick={event => deleteComment(event.currentTarget.id)}
            >
              delete
            </div>
          </div>
          <div className={styles.commentCard__comment}>{comment.comment}</div>
        </div>
      );
    });

  // TODO: this will come from the session once implemented
  const [isLoggedIn, setLoggedIn] = useState(true);
  const toggleLoggedIn = () => {
    setLoggedIn(prev => !prev);
  };

  const ActionButton = () => {
    const actionBtnText = isLoggedIn ? "SIGN OUT" : "SIGN IN TO COMMENT";
    const actionBtnStyle = isLoggedIn
      ? styles.commentsList__header__logout_button
      : styles.commentsList__header__login_button;

    return (
      <button className={actionBtnStyle} onClick={() => toggleLoggedIn()}>
        {actionBtnText}
      </button>
    );
  };

  return (
    <div className={styles.commentsList}>
      <div className={styles.commentsList__header}>
        <div className={styles.commentsList__header__title}>
          COMMENTS ({comments.length})
        </div>
        <ActionButton />
      </div>
      <CommentsList />
      {/* <button
        onClick={() =>
          addComment({
            commentId: uuid(),
            username: "test",
            comment: "No, it doesn't",
          })
        }
      /> */}
    </div>
  );
};
