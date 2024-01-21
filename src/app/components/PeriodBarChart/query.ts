import gql from "graphql-tag";

export default gql`
  query getPeriod($periodStart: String!, $periodEnd: String!) {
    Period(periodStart: $periodStart, periodEnd: $periodEnd) {
      timetableChart {
        day

        totalTimeAtOffice {
          hours
          minutes
        }
        totalMorningCommuteTime {
          hours
          minutes
        }
        totalEveningCommuteTime {
          hours
          minutes
        }
      }
    }
  }
`;
