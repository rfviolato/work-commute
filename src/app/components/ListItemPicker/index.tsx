import React from "react";
import { IListItemPickerProps } from "./interface";
import { NavigationButton, CurrentItemDisplay } from "./styled";

export const ListItemPicker: React.FC<IListItemPickerProps> = ({
  list,
  index,
  onChange = () => {},
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(index);
  const onPreviousClick = React.useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;

      setCurrentIndex(newIndex);
      onChange(list[newIndex], newIndex);
    }
  }, [currentIndex, onChange, list]);
  const onNextClick = React.useCallback(() => {
    if (currentIndex < list.length - 1) {
      const newIndex = currentIndex + 1;

      setCurrentIndex(newIndex);
      onChange(list[newIndex], newIndex);
    }
  }, [currentIndex, onChange, list]);

  React.useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  return (
    <div>
      <NavigationButton
        isUnavailable={currentIndex === 0}
        onClick={onPreviousClick}
      >
        <i className="far fa-arrow-circle-left" />
      </NavigationButton>

      <CurrentItemDisplay>{list[currentIndex]}</CurrentItemDisplay>

      <NavigationButton
        isUnavailable={currentIndex === list.length - 1}
        onClick={onNextClick}
      >
        <i className="far fa-arrow-circle-right" />
      </NavigationButton>
    </div>
  );
};
