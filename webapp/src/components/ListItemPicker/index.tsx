import React from 'react';
import { IListItemPickerProps } from './interface';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavigationButton, CurrentItemDisplay } from './styled';

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
  }, [currentIndex]);
  const onNextClick = React.useCallback(() => {
    if (currentIndex < list.length - 1) {
      const newIndex = currentIndex + 1;

      setCurrentIndex(newIndex);
      onChange(list[newIndex], newIndex);
    }
  }, [currentIndex]);

  React.useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  return (
    <div>
      <NavigationButton
        isUnavailable={currentIndex === 0}
        onClick={onPreviousClick}
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </NavigationButton>

      <CurrentItemDisplay>{list[currentIndex]}</CurrentItemDisplay>

      <NavigationButton
        isUnavailable={currentIndex === list.length - 1}
        onClick={onNextClick}
      >
        <FontAwesomeIcon icon={faArrowCircleRight} />
      </NavigationButton>
    </div>
  );
};
