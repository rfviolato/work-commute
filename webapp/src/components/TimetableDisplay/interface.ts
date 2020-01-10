import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ITimetable {
  timestamp?: string;
  label: string;
}

export interface ITimetableDisplayProps {
  icon: IconProp;
  timetables: ITimetable[];
  isLoading?: boolean;
  hasError?: boolean;
}
