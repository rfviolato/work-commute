import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUERY = gql`
  {
    Period(periodStart: "01-01-2019", periodEnd: "31-12-2019") {
      amountWorked {
        hours
        minutes
      }
      averageTimeWorking {
        hours
        minutes
      }
      averageTimeCommuting
    }
  }
`;

export const HelloWorld: React.FC = () => {
  const { loading, error, data } = useQuery(QUERY);

  console.log({ loading, error, data });

  return (
    <div>
      hell yea! <FontAwesomeIcon icon={faTimes} />
    </div>
  );
};
