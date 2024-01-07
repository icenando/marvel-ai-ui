"use client";

import { useComment } from "@/app/api/useComments";
import styles from "../styles/page.module.scss";
// import { v4 as uuid } from "uuid";

export const CommentsList = (): JSX.Element => {
  const { comments, addComment, editComment, deleteComment } = useComment();

  const commentsList = comments.map(comment => {
    return (
      <div key={comment.commentId} className={styles.commentCard}>
        <div className={styles.commentCard__username}>{comment.username}</div>
        <div>{comment.comment}</div>
      </div>
    );
  });

  // TODO: this will come from the session once implemented
  const isLoggedIn = true;

  const ActionButton = () => {
    return isLoggedIn ? (
      <button className={styles.commentsList__header__logout_button}>
        SIGN OUT
      </button>
    ) : (
      <button className={styles.commentsList__header__login_button}>
        SIGN IN TO COMMENT
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
      {commentsList}
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
