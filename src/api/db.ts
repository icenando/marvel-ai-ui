import { EventsResult } from "@/types/dynamoResponse";
import * as AWS from "aws-sdk";
import { String } from "aws-sdk/clients/appstream";

const db = new AWS.DynamoDB.DocumentClient();
const eventsTable = process.env.EVENTS_TABLE;

export const fetchAllEvents = async (): Promise<void | EventsResult[]> => {
  console.log(eventsTable);
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
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log(
          "fetchAllEvents scan succeeded. Item:",
          JSON.stringify(data!.Items, null, 2)
        );
        resolve(data.Items as EventsResult[]);
      }
    });
  });
};

export const fetchSingleEvent = async (
  eventId: String
): Promise<void | EventsResult> => {
  if (!eventsTable) {
    throw "Couldn't read table name from env vars";
  }
  const params = {
    TableName: eventsTable,
    ExpressionAttributeValues: {
      ":id": { N: eventId },
    },
    KeyConditionExpression: "id = :id",
  };

  return new Promise((resolve, reject) => {
    db.query(params, (err, data) => {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log(
          "fetchSingleEvent query succeeded. Item:",
          JSON.stringify(data.Items, null, 2)
        );
        resolve(data!.Items as unknown as EventsResult);
      }
    });
  });
};
