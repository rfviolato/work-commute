import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

export default gql`
  type Query {
    Period(periodStart: String!, periodEnd: String!): Period
  }

  type PeriodData {
    periodStart: String
    periodEnd: String
  }

  type Period {
    amountWorked: AmountWorked
    averageCommuteTime: Int
    averageTimeAtOffice: TimeAtOffice
  }

  type AmountWorked {
    hours: Int
    minutes: Int
  }

  type TimeAtOffice {
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
