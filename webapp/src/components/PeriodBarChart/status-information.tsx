import React from "react";
import posed, {PoseGroup} from "react-pose";
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEmptySet } from '@fortawesome/pro-regular-svg-icons';
import { faIcon as errorIcon } from '../QueryErrorIcon';
import { LoadingSpinner } from '../LoadingSpinner';
import { IStatusInfoProps } from './interface';

const AnimatedRoot = posed.div({
  enter: { opacity: 1, delay: 300 },
  exit: { opacity: 0 },
});

interface IRootProps {
  width?: number;
}

const Root = styled(AnimatedRoot)<IRootProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${({ width }) => `${width}px` || 'auto'}
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
  const renderContent = React.useCallback(() => {
    if (isLoading) {
      return (
        <Root width={100} key="loading">
          <LoadingSpinner />
        </Root>
      );
    }

    if (hasError) {
      return (
        <Root width={300} key="error">
          <Icon icon={errorIcon} />
          <Text>
            There was a problem while fetching data for the selected period
          </Text>
        </Root>
      );
    }

    if (noData) {
      return (
        <Root width={200} key="no-data">
          <Icon icon={faEmptySet} />
          <Text>No recorded data for the selected period</Text>
        </Root>
      );
    }

    return undefined;
  }, [isLoading, hasError, noData]);

  return (
    <PoseGroup flipMove={false}>
      {renderContent()}
    </PoseGroup>
  );
};
