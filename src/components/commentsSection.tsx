import styles from "../styles/page.module.scss";
import { NewCommentSection } from "./newComment";
import { CommentsList } from "./commentsList";
import { ActionButton } from "./actionButton";
import {
  addCommentForEvent,
  deleteCommentById,
  fetchCommentsForEvent,
} from "@/api/db";
import { Comment } from "@/types/types";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";
import { Session, getServerSession } from "next-auth";

type CommentsSectionProps = {
  eventId: number;
};
export const CommentsSection = async ({ eventId }: CommentsSectionProps) => {
  // TODO: this will come from the signin context
  const username = faker.internet.userName();
  const userId = faker.string.uuid();

  const onSubmit = async (formData: FormData) => {
    "use server";
    const comment = formData.get("comment") as string;
    const commentId = `${userId}_${uuid()}`;
    console.log("hello");
    await addCommentForEvent({
      eventId,
      commentId,
      comment,
      userId,
      username,
    });

    revalidatePath(`/archive/${eventId}`);
  };

  const deleteComment = async (eventId: number, commentId: string) => {
    "use server";
    await deleteCommentById(eventId, commentId);

    revalidatePath(`/archive/${eventId}`);
  };

  const session = await getServerSession();

  const comments = (await fetchCommentsForEvent(eventId)) as Comment[];

  return (
    <div className={styles.commentsList}>
      <div className={styles.commentsList__header}>
        <div className={styles.commentsList__header__title}>
          COMMENTS ({comments.length})
        </div>
        <ActionButton session={session as Session} />
      </div>
      <NewCommentSection eventId={eventId} onSubmit={onSubmit} />
      <CommentsList comments={comments} deleteComment={deleteComment} />
    </div>
  );
};
