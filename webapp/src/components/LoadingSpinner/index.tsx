import React from 'react';
import { faCog } from '@fortawesome/pro-solid-svg-icons';
import { Spinner } from './styled';

export const LoadingSpinner: React.FC = () => {
  return <Spinner icon={faCog} />;
};
