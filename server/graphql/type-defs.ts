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
    totalTimeAtOffice: TotalTimeAtOfficeResult
    averageTimeCommuting: AverageTimeCommutingResult
    averageTimeAtOffice: AverageTimeAtOfficeResult
  }

  type WorkTimetable {
    homeArriveTime: String
    homeLeaveTime: String
    workArriveTime: String
    workLeaveTime: String
    events: [String]
  }

  type TotalTimeAtOfficeResult {
    hours: Int
    minutes: Int
  }

  type AverageTimeCommutingResult {
    hours: Int
    minutes: Int
  }

  type AverageTimeAtOfficeResult {
    hours: Int
    minutes: Int
  }
` as DocumentNode;
