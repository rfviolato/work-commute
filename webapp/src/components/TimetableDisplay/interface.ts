export interface ITimetable {
  timestamp?: string;
  label: string;
}

export interface ITimetableDisplayProps {
  icon: any; // TODO: Fix any
  timetables: ITimetable[];
  isLoading?: boolean;
  hasError?: boolean;
}
