"use client";

import { Session } from "next-auth";
import styles from "../styles/page.module.scss";
import { Comment } from "@/types/types";

type CommentsListProps = {
  session: Session;
  comments: Comment[];
  deleteComment: (eventId: number, commentId: string) => Promise<void>;
};
export const CommentsList = ({
  session,
  comments,
  deleteComment,
}: CommentsListProps) =>
  comments.length ? (
    comments.map(comment => {
      return (
        <div key={comment.commentId} className={styles.commentCard}>
          <div className={styles.commentCard__username}>{comment.username}</div>
          <div className={styles.commentCard__options}>
            {session.user?.email === comment.userId && (
              <div
                className={styles.commentCard__comment__delete}
                id={comment.commentId}
                onClick={() =>
                  deleteComment(comment.eventId, comment.commentId)
                }
              >
                delete
              </div>
            )}
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
