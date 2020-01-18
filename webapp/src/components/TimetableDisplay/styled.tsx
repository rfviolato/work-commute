import styled from '@emotion/styled';
import { QueryErrorIcon } from '../QueryErrorIcon';

export const CSS_VARIABLES = {
  LABEL_MIN_WIDTH: 125,
  MQ: { X_SMALL: 375 },
};

export const Root = styled.div`
  display: flex;

  @media (max-width: ${CSS_VARIABLES.MQ.X_SMALL}px) {
    flex-direction: column;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px 0 0;
  margin-right: 34px;
  border-right: 1px solid #aaa;
  font-size: 42px;

  @media (max-width: ${CSS_VARIABLES.MQ.X_SMALL}px) {
    border-right: none;
    padding: 0 0 20px 0;
    margin: 0;
    justify-content: center;
  }
`;

export const TimetableContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

interface ITimetableProps {
  isLoading?: boolean;
}
export const Timetable = styled.li<ITimetableProps>`
  display: ${({ isLoading }) => (isLoading ? 'initial' : 'flex')};
  align-items: center;
  padding: 7px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #aaa;
  }

  @media (max-width: ${CSS_VARIABLES.MQ.X_SMALL}px) {
    justify-content: center;
  }
`;

export const TimetableLabel = styled.span`
  display: inline-block;
  min-width: ${CSS_VARIABLES.LABEL_MIN_WIDTH}px;
  font-size: 0.75em;
  font-size: 14px;
  opacity: 0.9;
`;

export const TimetableTimestamp = styled.span`
  font-weight: bold;
`;

export const DisplayIconContainer = styled.div`
  position: relative;
`;

export const ErrorDisplay = styled(QueryErrorIcon)`
  position: absolute;
  top: -12px;
  right: -12px;
`;
