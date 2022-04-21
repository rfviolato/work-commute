import { ReactNode } from 'react';

export interface IIconLabelProps {
  children: ReactNode;
  label: string;
  icon: any; // TODO: Fix any
  hasError?: boolean;
}
