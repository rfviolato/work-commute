import { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IIconCardProps {
  children: ReactNode;
  label: string;
  icon: IconProp;
}
