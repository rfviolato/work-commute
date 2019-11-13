import * as admin from 'firebase-admin';
import { ApolloServer, gql } from 'apollo-server-micro';
import serviceAccount from './../firebase-service-account.json';

interface IWorkTimetable {
  homeArriveTime: string;
  homeLeaveTime: string;
  workArriveTime: string;
  workLeaveTime: string;
  events: {
    [key: string]: string;
  }[];
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://work-commute-fbc8e.firebaseio.com',
});

const db = admin.database();

const typeDefs = gql`
  type Query {
    workTimetable: WorkTimetable
  }

  type WorkTimetable {
    homeArriveTime: String
    homeLeaveTime: String
    workArriveTime: String
    workLeaveTime: String
    events: [String]
  }
`;

const resolvers = {
  Query: {
    workTimetable: async (): Promise<IWorkTimetable> => {
      try {
        const snapshot = (await db
          .ref('/workDayTimetables/10-11-2019')
          .once('value')) as admin.database.DataSnapshot;
        const dayTimetable = snapshot.val() as IWorkTimetable;

        return {
          ...dayTimetable,
          events: Object.values(dayTimetable.events),
        };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
