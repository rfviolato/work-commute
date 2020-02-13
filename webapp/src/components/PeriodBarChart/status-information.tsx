import React from 'react';
import { IStatusInfoProps } from './interface';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEmptySet } from '@fortawesome/pro-regular-svg-icons';
import { faIcon as erroIcon } from '../QueryErrorIcon';
import { LoadingSpinner } from '../LoadingSpinner';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 60px;
  margin-bottom: 16px;
`;

const Text = styled.div`
  font-size: 18px;
`;

export const StatusInformation: React.FC<IStatusInfoProps> = ({
  noData,
  hasError,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Root>
        <LoadingSpinner />
      </Root>
    );
  }

  if (hasError) {
    return (
      <Root>
        <Icon icon={erroIcon} />
        <Text>
          There was a problem while fecthing data for the selected period
        </Text>
      </Root>
    );
  }

  if (noData) {
    return (
      <Root>
        <Icon icon={faEmptySet} />
        <Text>No recorded data for the selected period</Text>
      </Root>
    );
  }

  return null;
};
