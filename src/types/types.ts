export type EventsResult = {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  url: string;
  used: boolean;
  imgUrl: string;
  revisedPrompt: string;
};

export type Comment = {
  eventId: number;
  userId: string;
  username: string;
  profilePicture?: string;
  commentId: string;
  comment: string;
  dateUpdated: string;
};

export type UserInfo = {
  username: string;
  userId: string;
  profilePicture: string | undefined;
};
