import { MongoClient } from "mongodb";
import { IDB } from "../types";

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const MONGODB_URL = `mongodb+srv://${username}:${password}@cluster0-uk48d.mongodb.net/work-commute?retryWrites=true&w=majority`;

export const createDbClient = async (): Promise<IDB> => {
  try {
    const client = await MongoClient.connect(MONGODB_URL, {
      // useUnifiedTopology: true,
    });

    const db = client.db(process.env.DB_NAME);
    const workTimetable = db.collection("workTimetable");

    return {
      workTimetable,
    };
  } catch (e) {
    console.error(e);
    throw new Error(e as any);
  }
};
