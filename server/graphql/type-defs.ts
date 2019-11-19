import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

export default gql`
  type Query {
    workedInPeriod(periodStart: String!, periodEnd: String!): workedPeriod
  }

  type workedPeriod {
    hours: Int
    minutes: Int
  }

  type WorkTimetable {
    homeArriveTime: String
    homeLeaveTime: String
    workArriveTime: String
    workLeaveTime: String
    events: [String]
  }
` as DocumentNode;
