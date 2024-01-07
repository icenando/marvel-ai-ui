"use client";

import { useComment } from "@/app/api/useComments";
import { v4 as uuid } from "uuid";

export const CommentsList = (): JSX.Element => {
  const { comments, addComment } = useComment();

  const commentsList = comments.map(comment => {
    return (
      <div key={comment.commentId}>
        <div>{comment.username}</div>
        <div>{comment.comment}</div>
      </div>
    );
  });

  return (
    <div>
      {commentsList}
      <button
        onClick={() =>
          addComment({
            commentId: uuid(),
            username: "test",
            comment: "No, it doesn't",
          })
        }
      />
    </div>
  );
};
