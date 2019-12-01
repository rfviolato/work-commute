import { MongoClient } from 'mongodb';

// TODO: Abstract to .env file or secret
const MONGODB_URL =
  'mongodb+srv://@cluster0-uk48d.mongodb.net/work-commute?retryWrites=true&w=majority';

// TODO: Abstract to constants file
const DB_NAME = 'work-commute';

export const createDbClient = async () => {
  const client = await MongoClient.connect(MONGODB_URL, {
    useUnifiedTopology: true,
  }).catch(err => {
    throw new Error(err);
  });

  try {
    const db = client.db(DB_NAME);
    const workTimetable = db.collection('workTimetable');

    return {
      workTimetable,
    };
  } catch (e) {
    throw new Error(e);
  }
};
