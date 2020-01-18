import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

export default gql`
  type Query {
    Period(periodStart: String!, periodEnd: String!): Period
    Day(day: String!): Day
    FirstRecord: WorkTimetableRecord
  }

  type PeriodData {
    periodStart: String
    periodEnd: String
  }

  type Period {
    totalTimeAtOffice: TotalTimeAtOfficeResult
    averageTimeCommuting: AverageTimeCommutingResult
    averageTimeAtOffice: AverageTimeAtOfficeResult
    timetableChart: [TimetableChartResult]
  }

  type Day {
    date: String
    day: String
    events: [String]
    homeArriveTime: String
    homeLeaveTime: String
    workArriveTime: String
    workLeaveTime: String
    totalMorningCommuteTime: TotalMorningCommuteTime
    totalEveningCommuteTime: TotalEveningCommuteTime
    totalTimeAtOffice: TotalTimeAtOfficeResult
  }

  type TimetableChartResult {
    date: String
    day: String
    events: [String]
    homeArriveTime: String
    homeLeaveTime: String
    workArriveTime: String
    workLeaveTime: String
    totalTimeAtOffice: TotalTimeAtOfficeResult
    totalMorningCommuteTime: TotalMorningCommuteTime
    totalEveningCommuteTime: TotalEveningCommuteTime
  }

  type WorkTimetableRecord {
    date: String
    day: String
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

  type TotalMorningCommuteTime {
    hours: Int
    minutes: Int
  }

  type TotalEveningCommuteTime {
    hours: Int
    minutes: Int
  }
` as DocumentNode;
