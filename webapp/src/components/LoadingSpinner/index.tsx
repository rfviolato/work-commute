import React from 'react';
import { Spinner } from './styled';
import { ILoadingSpinnerProps } from './interface';

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ className }) => {
  return (
    <Spinner className={className}>
      <i className="fas fa-cog" />
    </Spinner>
  );
};
