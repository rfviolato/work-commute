import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEmptySet } from '@fortawesome/pro-regular-svg-icons';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 16px;
`;

const Text = styled.div`
  font-size: 18px;
`;

export const NoChartDataDisplay: React.FC = () => {
  return (
    <Root>
      <Icon icon={faEmptySet} />
      <Text>No data for this period</Text>
    </Root>
  );
};
