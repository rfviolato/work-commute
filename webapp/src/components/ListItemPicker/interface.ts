export interface IListItemPickerProps {
  list: string[];
  initialIndex: number;
  onChange?: (currentIndex: number) => void;
}

export interface INavigationButtonProps {
  isUnavailable: boolean;
}
