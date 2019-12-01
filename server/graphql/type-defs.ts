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
    averageTimeCommuting: Int
    averageTimeWorking: TimeAtOffice
  }

  type WorkTimetable {
    homeArriveTime: String
    homeLeaveTime: String
    workArriveTime: String
    workLeaveTime: String
    events: [String]
  }

  type AmountWorked {
    hours: Int
    minutes: Int
  }

  type TimeAtOffice {
    hours: Int
    minutes: Int
  }
` as DocumentNode;
