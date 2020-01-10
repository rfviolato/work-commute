import { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IIconLabelProps {
  children: ReactNode;
  label: string;
  icon: IconProp;
  hasError?: boolean;
}
