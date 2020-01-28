import React from 'react';
import { faCog } from '@fortawesome/pro-solid-svg-icons';
import { Spinner } from './styled';
import { ILoadingSpinnerProps } from './interface';

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ className }) => {
  return <Spinner className={className} icon={faCog} />;
};
