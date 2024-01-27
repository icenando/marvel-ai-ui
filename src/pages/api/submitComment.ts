import type { NextApiRequest, NextApiResponse } from "next";
import { addCommentForEvent, moderateComment } from "@/api/db";
import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";

type RequestBody = {
  userId: string;
  eventId: number;
  username: string;
  profilePicture: string;
  comment: string;
};

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { userId, eventId, username, profilePicture, comment } =
      req.body as RequestBody;

    const passedModeration = await moderateComment(comment);

    if (!passedModeration) {
      return res.status(400).json({ message: "Failed moderation" });
    }

    const commentId = `${userId}_${uuid()}`;
    await addCommentForEvent({
      eventId,
      commentId,
      comment,
      userId,
      username,
      profilePicture,
    });

    revalidatePath(`/archive/${eventId}`);

    return res.status(200).json({ message: "Comment added successfully" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
