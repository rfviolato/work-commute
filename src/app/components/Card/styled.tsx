import styled from '@emotion/styled';
import { COLORS } from '../../global-styles';

export const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 1px solid ${COLORS.GRAY};
  border-radius: 4px;
  background-color: ${COLORS.LIGHT_BLACK};
`;
