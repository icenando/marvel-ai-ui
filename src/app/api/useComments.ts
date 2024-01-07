import { useState } from "react";
import { Comment } from "@/types/types";

// TODO: temporary useState structure just to test locally
// Replace with comments DB CRUD functions
export const useComment = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      commentId: "1234",
      username: "Nando",
      comment: "This painting sucks",
    },
    {
      commentId: "2345",
      username: "test",
      comment: "No, it doesn't",
    },
  ]);

  const addComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  const editComment = (newComment: Comment) => {
    const commentIdx = comments.findIndex(comment => {
      comment.comment = newComment.comment;
    });

    const commentsState = comments;
    commentsState[commentIdx].comment = newComment.comment;

    setComments(commentsState);
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter(({ commentId }) => commentId !== id));
  };

  return { comments, addComment, editComment, deleteComment };
};
