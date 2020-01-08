import { gql } from 'apollo-boost';

export default gql`
  query getFirstRecord {
    FirstRecord {
      day
    }
  }
`;
