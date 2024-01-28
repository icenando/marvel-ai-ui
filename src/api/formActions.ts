"use server";

import { revalidatePath } from "next/cache";
import { deleteCommentById } from "./db";

export default async function deleteComment(_: any, formData: FormData) {
  const eventId = parseInt(formData.get("eventId") as string);
  const commentId = formData.get("commentId") as string;

  await deleteCommentById(eventId, commentId);

  revalidatePath(`/archive/${eventId}`);
}
