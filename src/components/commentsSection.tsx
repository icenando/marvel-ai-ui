import styles from "../styles/page.module.scss";
import { NewCommentSection } from "./newComment";
import { CommentsList } from "./commentsList";
import { ActionButton } from "./actionButton";
import { fetchCommentsForEvent } from "@/api/db";
import { Comment } from "@/types/types";

type CommentsSectionProps = {
  eventId: number;
};
export const CommentsSection = async ({
  eventId,
}: CommentsSectionProps): Promise<JSX.Element> => {
  const comments = (await fetchCommentsForEvent(eventId)) as Comment[];

  return (
    <div className={styles.commentsList}>
      <div className={styles.commentsList__header}>
        <div className={styles.commentsList__header__title}>
          COMMENTS ({comments.length})
        </div>
        <ActionButton />
      </div>
      <CommentsList comments={comments} />
      {true && <NewCommentSection eventId={eventId} />}
    </div>
  );
};
