"use server";

import { revalidatePath } from "next/cache";
import { addCommentForEvent, deleteCommentById, moderateComment } from "./db";
import { v4 as uuid } from "uuid";

export async function deleteComment(_: any, formData: FormData) {
  const eventId = parseInt(formData.get("eventId") as string);
  const commentId = formData.get("commentId") as string;

  await deleteCommentById(eventId, commentId);

  revalidatePath(`/archive/${eventId}`);
}

export async function submitComment(_: any, formData: FormData) {
  const eventId = parseInt(formData.get("eventId") as string);
  const username = formData.get("username") as string;
  const userId = formData.get("userId") as string;
  const profilePicture = formData.get("profilePicture") as string;
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
}
