import { gql } from "graphql-tag";

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
