import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/pro-solid-svg-icons';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

/**
 * TODO:
 * - Add animation to spin
 * - Make it sizeable via props or just with font-size in `em`s
 */

const rotate = keyframes`  
  50% {
    transform: rotate(180deg) scale(1.25);
    opacity: 1;
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const Spinner = styled(FontAwesomeIcon)`
  opacity: 0.75;
  animation: ${rotate} 1500ms cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
`;

export const LoadingSpinner: React.FC = () => {
  return <Spinner icon={faCog} />;
};
