"use server";

import { revalidatePath } from "next/cache";
import { deleteCommentById } from "./db";

export default async function deleteComment(
  eventId: number,
  commentId: string
) {
  "use server";
  await deleteCommentById(eventId, commentId);

  revalidatePath(`/archive/${eventId}`);
}
