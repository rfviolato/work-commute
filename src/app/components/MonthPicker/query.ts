import { gql } from "graphql-tag";

export default gql`
  query getFirstRecord {
    FirstRecord {
      day
    }
  }
`;
