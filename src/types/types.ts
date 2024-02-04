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

export type ModerationObject = {
  id: string;
  model: string;
  results: [
    {
      flagged: boolean;
      categories: {
        sexual: boolean;
        hate: boolean;
        harassment: boolean;
        "self-harm": boolean;
        "sexual/minors": boolean;
        "hate/threatening": boolean;
        "violence/graphic": boolean;
        "self-harm/intent": boolean;
        "self-harm/instructions": boolean;
        "harassment/threatening": boolean;
        violence: boolean;
      };
      category_scores: {
        sexual: number;
        hate: number;
        harassment: number;
        "self-harm": number;
        "sexual/minors": number;
        "hate/threatening": number;
        "violence/graphic": number;
        "self-harm/intent": number;
        "self-harm/instructions": number;
        "harassment/threatening": number;
        violence: number;
      };
    }
  ];
};


export type UniqueUser = {
  id: string;
  display: string;
};