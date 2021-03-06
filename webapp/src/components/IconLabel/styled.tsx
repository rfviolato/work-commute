import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { QueryErrorIcon } from '../QueryErrorIcon';
import { COLORS } from '../../global-styles';

export const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 2px solid ${COLORS.GRAY};
  border-radius: 50%;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 25px;
  position: relative;
  top: -1px;
  opacity: 0.9;
`;

export const Label = styled.div`
  font-size: 14px;
  margin-top: 10px;
  opacity: 0.9;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #aaa;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  padding-top: 18px;
  line-height: 1;
`;

export const ErrorDisplay = styled(QueryErrorIcon)`
  position: absolute;
  top: -12px;
  right: -12px;
`;
