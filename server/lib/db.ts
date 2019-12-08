import { MongoClient } from 'mongodb';

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const MONGODB_URL = `mongodb+srv://${username}:${password}@cluster0-uk48d.mongodb.net/work-commute?retryWrites=true&w=majority`;

export const createDbClient = async () => {
  const client = await MongoClient.connect(MONGODB_URL, {
    useUnifiedTopology: true,
  }).catch((err) => {
    throw new Error(err);
  });

  try {
    const db = client.db(process.env.DB_NAME);
    const workTimetable = db.collection('workTimetable');

    return {
      workTimetable,
    };
  } catch (e) {
    throw new Error(e);
  }
};
