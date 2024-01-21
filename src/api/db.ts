import { Comment, EventsResult } from "@/types/types";
import { DynamoDB } from "aws-sdk";
import { revalidatePath } from "next/cache";

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
        console.log(
          "fetchAllEvents scan succeeded. Item:"
          // JSON.stringify(data!.Items, null, 2)
        );
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
        console.log(
          "fetchSingleEvent query succeeded. Item:"
          // JSON.stringify(data.Items, null, 2)
        );
        resolve(data.Items![0] as EventsResult);
      }
    });
  });
};

// COMMENTS
// TODO: DeleteComment
export const fetchCommentsForEvent = async (
  eventId: number
): Promise<void | Comment[]> => {
  if (!commentsTable) {
    throw "Couldn't read table name from env vars";
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
        console.log(
          "fetchCommentsForEvent query succeeded. Comments:",
          JSON.stringify(data.Items, null, 2)
        );
        resolve(data.Items! as Comment[]);
      }
    });
  });
};

export const addCommentForEvent = async (comment: Comment) => {
  if (!commentsTable) {
    throw "Couldn't read table name from env vars";
  }

  console.log("writing comment to DB. Comment: ");

  const dateUpdated = new Date().toISOString();
  const params = { ...comment, dateUpdated };

  db.put(
    {
      TableName: "Comments",
      Item: params,
    },
    (err, data) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.info("INSERTED COMMENT:");
        console.info(JSON.stringify(data, null, 2));
      }
    }
  ).promise();
  revalidatePath(`/archive/${comment.eventId}`);
  // revalidatePath("/");
};
