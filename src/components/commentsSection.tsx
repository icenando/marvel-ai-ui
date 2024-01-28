import styles from "../styles/page.module.scss";
import { NewCommentSection } from "./newComment";
import { ActionButton } from "./actionButton";
import {
  addCommentForEvent,
  deleteCommentById,
  fetchCommentsForEvent,
  moderateComment,
} from "@/api/db";
import { Comment } from "@/types/types";
import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";
import { Session, getServerSession } from "next-auth";
import { CommentsList } from "./commentsList";

type CommentsSectionProps = {
  eventId: number;
};
export const CommentsSection = async ({ eventId }: CommentsSectionProps) => {
  const session = await getServerSession();
  const username = (session?.user?.name as string) || "";
  const userId = session?.user?.email || "";
  const profilePicture = session?.user?.image || undefined;

  const submitComment = async (
    _: any,
    formData: FormData
  ): Promise<"Failed moderation" | "Success"> => {
    "use server";
    const comment = formData.get("comment") as string;
    const commentId = `${userId}_${uuid()}`;

    const passedModeration = await moderateComment(comment);
    if (!passedModeration) return "Failed moderation";

    await addCommentForEvent({
      eventId,
      commentId,
      comment,
      userId,
      username,
      profilePicture,
    });

    revalidatePath(`/archive/${eventId}`);

    return "Success";
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
            Signed in ({username})
          </div>
        )}
        <ActionButton session={session as Session} />
      </div>
      {session && <NewCommentSection onSubmit={submitComment} />}
      <CommentsList
        session={session as Session}
        comments={comments}
      />
    </div>
  );
};
