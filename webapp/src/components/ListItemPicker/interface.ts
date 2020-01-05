export interface IListItemPickerProps {
  list: string[];
  index: number;
  onChange?: (currentValue: string, currentIndex: number) => void;
}

export interface INavigationButtonProps {
  isUnavailable: boolean;
}
