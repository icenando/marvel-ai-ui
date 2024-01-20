export type EventsResult = {
  id: number;
  title: string;
  description: string;
  start: string; // String but in Date format
  end: string;
  url: string;
  used: boolean;
  imgUrl: string;
  revisedPrompt: string;
};

export type Comment = {
  eventId: string;
  userId: string;
  commentId: string;
  username: string;
  comment: string;
};
