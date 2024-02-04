import styles from "../styles/page.module.scss";
import { NewCommentSection } from "./newComment";
import { ActionButton } from "./actionButton";
import { fetchCommentsForEvent } from "@/api/db";
import { Comment, UniqueUser, UserInfo } from "@/types/types";
import { Session, getServerSession } from "next-auth";
import { CommentsList } from "./commentsList";

type CommentsSectionProps = {
  eventId: number;
};
export const CommentsSection = async ({ eventId }: CommentsSectionProps) => {
  const session = await getServerSession();

  const userInfo: UserInfo = {
    username: session?.user?.name as string,
    userId: session?.user?.email as string,
    profilePicture: session?.user?.image || undefined,
  };

  const comments = (await fetchCommentsForEvent(eventId)) as Comment[];
  const usersNames = Array.from(
    new Set(comments.map(comment => comment.username))
  );
  const uniqueUsers: UniqueUser[] = usersNames.map(username => {
    const userComment = comments.find(comment => comment.username === username);
    return {
      id: userComment?.userId,
      display: userComment?.username,
    } as UniqueUser;
  });

  return (
    <div className={styles.commentsList}>
      <div className={styles.commentsList__header}>
        <div className={styles.commentsList__header__title}>
          COMMENTS ({comments.length})
        </div>
        {session && (
          <div className={styles.commentsList__header__signedInInfo}>
            Signed in ({userInfo.username})
          </div>
        )}
        <ActionButton session={session as Session} />
      </div>
      {session && (
        <NewCommentSection
          eventId={eventId}
          userInfo={userInfo}
          users={uniqueUsers}
        />
      )}
      <CommentsList session={session as Session} comments={comments} />
    </div>
  );
};
