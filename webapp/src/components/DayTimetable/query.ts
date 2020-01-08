import { gql } from 'apollo-boost';

export default gql`
  query getDayTimetable($day: String!) {
    Day(day: $day) {
      homeLeaveTime
      workArriveTime
      workLeaveTime
      homeArriveTime
    }
  }
`;
