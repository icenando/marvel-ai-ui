"use client";

import { Session } from "next-auth";
import styles from "../styles/page.module.scss";
import { Comment } from "@/types/types";
import Image from "next/image";
import incognito from "../resources/incognito.png";
import moment from "moment";
import deleteComment from "@/api/formActions";

type CommentsListProps = {
  session: Session;
  comments: Comment[];
};
export const CommentsList = ({
  session,
  comments,
}: CommentsListProps) => {
  type ProfilePicProps = {
    comment: Comment;
  };

  const ProfilePic = ({ comment }: ProfilePicProps) => {
    const { profilePicture, username } = comment;

    return (
      <div className={styles.commentCard__profilePicSection}>
        <Image
          className={styles.profilePicture}
          src={profilePicture ? profilePicture : incognito}
          height={35}
          width={35}
          alt="user profile picture"
        />
        <div className={styles.commentCard__username}>{username}</div>
        <div className={styles.commentCard__timeSince}>
          {moment(comment.dateUpdated).fromNow()}
        </div>
      </div>
    );
  };

  return comments.length ? (
    comments.map(comment => {
      const isCommentAuthor = session?.user?.email === comment.userId;

      return (
        <div key={comment.commentId} className={styles.commentCard}>
          <ProfilePic comment={comment} />
          {isCommentAuthor && (
            <div className={styles.commentCard__options}>
              <div
                className={styles.commentCard__comment__delete}
                id={comment.commentId}
                onClick={() =>
                  deleteComment(comment.eventId, comment.commentId)
                }
              >
                delete
              </div>
            </div>
          )}
          <div className={styles.commentCard__comment}>{comment.comment}</div>
        </div>
      );
    })
  ) : (
    <div className={styles.commentCard}>
      <div className={styles.commentCard__comment}>No comments</div>
    </div>
  );
};
