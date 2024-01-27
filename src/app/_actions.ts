"use server";

import { addCommentForEvent, moderateComment } from "@/api/db";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

type OnSubmitProps = {
  userId: string;
  eventId: number;
  username: string;
  profilePicture: string;
};

export const buildSubmission = ({
  userId,
  eventId,
  username,
  profilePicture,
}: OnSubmitProps) => {
  return async (_: any, formData: FormData) => {
    const comment = formData.get("comment") as string;
    const commentId = `${userId}_${uuid()}`;

    if (!moderateComment(comment)) return "Failed moderation";

    await addCommentForEvent({
      eventId,
      commentId,
      comment,
      userId,
      username,
      profilePicture,
    });

    revalidatePath(`/archive/${eventId}`);
    return "";
  };
};
