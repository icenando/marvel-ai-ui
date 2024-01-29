import { Comment, EventsResult, ModerationObject } from "@/types/types";
import { DynamoDB } from "aws-sdk";

const eventsTable = process.env.EVENTS_TABLE;
const commentsTable = process.env.COMMENTS_TABLE;
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const db = new DynamoDB.DocumentClient({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// EVENTS
export const fetchAllEvents = async (): Promise<void | EventsResult[]> => {
  if (!eventsTable) {
    throw "Couldn't read table name from env vars";
  }

  const params = {
    TableName: eventsTable,
    FilterExpression: "#used = :value",
    ExpressionAttributeNames: {
      "#used": "used",
    },
    ExpressionAttributeValues: {
      ":value": true,
    },
  };

  return new Promise((resolve, reject) => {
    db.scan(params, (err, data) => {
      if (err) {
        console.error(
          "fetchAllEvents failed with error:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        console.info("fetchAllEvents scan succeeded.");
        console.debug(`Items: ${JSON.stringify(data!.Items, null, 2)}`);
        resolve(data.Items as EventsResult[]);
      }
    });
  });
};

export const fetchSingleEvent = async (
  eventId: number
): Promise<void | EventsResult> => {
  if (!eventsTable) {
    throw "Couldn't read table name from env vars";
  }

  const params = {
    TableName: eventsTable,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": eventId,
    },
  };

  return new Promise((resolve, reject) => {
    db.query(params, (err, data) => {
      if (err) {
        console.error(
          "fetchSingleEvent failed with error:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        console.info("fetchSingleEvent query succeeded.");
        console.debug(`Items: ${JSON.stringify(data!.Items, null, 2)}`);
        resolve(data.Items![0] as EventsResult);
      }
    });
  });
};

// COMMENTS
export const fetchCommentsForEvent = async (
  eventId: number
): Promise<void | Comment[]> => {
  if (!commentsTable) {
    throw "Couldn't read Comments table name from env vars";
  }

  const params = {
    TableName: commentsTable,
    IndexName: "EventDateIndex",
    KeyConditionExpression: "eventId = :id",
    ExpressionAttributeValues: {
      ":id": eventId,
    },
    ScanIndexForward: false,
  };

  return new Promise((resolve, reject) => {
    db.query(params, (err, data) => {
      if (err) {
        console.error(
          "fetchCommentsForEvent failed with error:",
          JSON.stringify(err, null, 2)
        );
        reject(err);
      } else {
        console.info("fetchCommentsForEvent query succeeded.");
        console.debug(`Comments: ${JSON.stringify(data!.Items, null, 2)}`);
        resolve(data.Items! as Comment[]);
      }
    });
  });
};

export const addCommentForEvent = async (comment: Partial<Comment>) => {
  if (!commentsTable) {
    throw "Couldn't read Comments table name from env vars";
  }

  console.info("writing comment to DB. Comment: ");

  const dateUpdated = new Date().toISOString();
  const params = { ...comment, dateUpdated };

  db.put(
    {
      TableName: "Comments",
      Item: params,
    },
    err => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.info("INSERTED COMMENT");
      }
    }
  ).promise();
};

export const deleteCommentById = async (eventId: number, commentId: string) => {
  if (!commentsTable) {
    throw "Couldn't read Comments table name from env vars";
  }

  console.info(
    "deleting comment from DB. Event ID: ",
    eventId,
    "Comment ID: ",
    commentId
  );

  const params = {
    TableName: "Comments",
    Key: {
      eventId: eventId,
      commentId: commentId,
    },
  };

  try {
    await db.delete(params).promise();
    console.info("DELETED COMMENT");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const moderateComment = async (comment: string): Promise<boolean> => {
  const moderationUrl = process.env.OPENAI_MODERATION_URL as string;
  const bearerToken = process.env.OPENAI_SECRET;
  const body = {
    input: comment,
  };

  const options = {
    method: "POST",
    headers: new Headers({
      "Content-type": "application/json",
      Authorization: `bearer ${bearerToken}`,
    }),
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(5 * 1000),
  };

  console.info("Sending comment for moderation...");
  const resp: ModerationObject = await fetch(moderationUrl, options)
    .then(res => res.json())
    .catch(e => {
      console.error(e);
      throw e;
    });

  return !resp.results[0].flagged;
};
