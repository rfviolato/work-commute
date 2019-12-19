import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

export default gql`
  type Query {
    Period(periodStart: String!, periodEnd: String!): Period
    Day(day: String!): Day
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
    homeArriveTime: String
    homeLeaveTime: String
    workArriveTime: String
    workLeaveTime: String
    totalMorningCommuteTime: TotalMorningCommuteTime
    totalEveningCommuteTime: TotalEveningCommuteTime
    totalTimeAtOffice: TotalTimeAtOfficeResult
  }

  type TimetableChartResult {
    homeArriveTime: String
    homeLeaveTime: String
    workArriveTime: String
    workLeaveTime: String
    events: [String]
    totalTimeAtOffice: TotalTimeAtOfficeResult
    totalMorningCommuteTime: TotalMorningCommuteTime
    totalEveningCommuteTime: TotalEveningCommuteTime
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

  type TotalMorningCommuteTime {
    hours: Int
    minutes: Int
  }

  type TotalEveningCommuteTime {
    hours: Int
    minutes: Int
  }
` as DocumentNode;
