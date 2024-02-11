"use client";

import styles from "./commentsList.module.scss";
import { Comment, User } from "@/types/types";
import Image from "next/image";
import incognito from "../assets/incognito.png";
import moment from "moment";
import { deleteComment } from "@/api/formActions";
import { useFormState } from "react-dom";
import DeleteButton from "./deleteButton";

type CommentsListProps = {
  user: User;
  comments: Comment[];
};
export const CommentsList = ({ user, comments }: CommentsListProps) => {
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

  const [_, formAction] = useFormState(deleteComment, null);

  return comments.length ? (
    comments.map(comment => {
      const isCommentAuthor = user.userId === comment.userId;

      return (
        <form key={comment.commentId} action={formAction}>
          <input type="hidden" name="eventId" value={comment.eventId} />
          <input type="hidden" name="commentId" value={comment.commentId} />
          <div className={styles.commentCard}>
            <ProfilePic comment={comment} />
            {isCommentAuthor && <DeleteButton />}
            <div className={styles.commentCard__comment}>{comment.comment}</div>
          </div>
        </form>
      );
    })
  ) : (
    <div className={styles.commentCard}>
      <div className={styles.commentCard__comment}>No comments</div>
    </div>
  );
};
