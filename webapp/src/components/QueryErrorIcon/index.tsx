import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons';
import { Root } from './styled';

export const faIcon = faExclamationCircle;
export const QueryErrorIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <Root>
    <FontAwesomeIcon className={className} icon={faIcon} />
  </Root>
);
