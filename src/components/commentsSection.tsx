import styles from "./commentsSection.module.scss";
import { NewCommentSection } from "./newComment";
import { ActionButton } from "./actionButton";
import { fetchCommentsForEvent } from "@/api/db";
import { Comment, User } from "@/types/types";
import { Session, getServerSession } from "next-auth";
import { CommentsList } from "./commentsList";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

type CommentsSectionProps = {
  eventId: number;
};
export const CommentsSection = async ({ eventId }: CommentsSectionProps) => {
  const session = await getServerSession(authOptions);

  const user: User = {
    username: session?.user?.name as string,
    userId: session?.user?.id as string,
    profilePicture: session?.user?.image || undefined,
  };

  const comments = (await fetchCommentsForEvent(eventId)) as Comment[];

  return (
    <div className={styles.commentsList}>
      <div className={styles.commentsList__header}>
        <div className={styles.commentsList__header__title}>
          COMMENTS ({comments.length})
        </div>
        {session && (
          <div className={styles.commentsList__header__signedInInfo}>
            Signed in ({user.username})
          </div>
        )}
        <ActionButton session={session as Session} />
      </div>
      {session && <NewCommentSection eventId={eventId} user={user} />}
      <CommentsList user={user} comments={comments} />
    </div>
  );
};
