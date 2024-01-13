import { gql } from 'apollo-boost';

export default gql`
  query getDayTotals($day: String!) {
    Day(day: $day) {
      totalMorningCommuteTime {
        hours
        minutes
      }

      totalEveningCommuteTime {
        hours
        minutes
      }

      totalTimeAtOffice {
        hours
        minutes
      }
    }
  }
`;
