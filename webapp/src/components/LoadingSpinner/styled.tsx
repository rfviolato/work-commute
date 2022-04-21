// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

const rotate = keyframes`  
  50% {
    transform: rotate(180deg) scale(1.25);
    opacity: 1;
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
`;

export const Spinner = styled.span`
  opacity: 0.75;
  animation: ${rotate} 1500ms cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
`;
