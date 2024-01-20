"use client";

import { useComment } from "@/app/api/useComments";
import styles from "../styles/page.module.scss";
import { useState } from "react";
import { NewCommentSection } from "./newComment";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";

export const CommentsSection = (): JSX.Element => {
  // TODO: this will come from the signin context
  const username = faker.internet.userName();
  const userId = faker.string.uuid();

  const { comments, addComment, editComment, deleteComment } = useComment();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get("comment") as string;
    const commentId = `${userId}_${uuid()}`;
    addComment({
      commentId,
      comment,
      userId,
      username,
    });
  };

  const CommentsList = () =>
    comments.length ? (
      comments.map(comment => {
        return (
          <div key={comment.commentId} className={styles.commentCard}>
            <div className={styles.commentCard__username}>
              {comment.username}
            </div>
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
      })
    ) : (
      <div className={styles.commentCard}>
        <div className={styles.commentCard__comment}>Leave a comment</div>
      </div>
    );

  // TODO: this will come from the session once implemented
  const [isLoggedIn, setLoggedIn] = useState(true);
  const toggleLoggedIn = () => {
    setLoggedIn(prev => !prev);
  };

  const ActionButton = () => {
    const actionBtnText = isLoggedIn ? "SIGN OUT" : "SIGN IN TO POST";
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
      {isLoggedIn && <NewCommentSection onSubmit={onSubmit} />}
    </div>
  );
};
