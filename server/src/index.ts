import * as admin from 'firebase-admin';
import { ApolloServer, gql } from 'apollo-server';
import serviceAccount from './config/firebase-service-account.json';

const firebaseConfig = {
  apiKey: 'AIzaSyAbkuB89P0mAupxhLcWsPgENDgmcLPq7kM',
  authDomain: 'work-commute-fbc8e.firebaseapp.com',
  databaseURL: 'https://work-commute-fbc8e.firebaseio.com',
  projectId: 'work-commute-fbc8e',
  storageBucket: 'work-commute-fbc8e.appspot.com',
  messagingSenderId: '808772314364',
  appId: '1:808772314364:web:bcd2ed1555e5535aa9a379',
};

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

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
