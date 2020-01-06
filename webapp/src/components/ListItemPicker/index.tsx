import React from 'react';
import { IListItemPickerProps, INavigationButtonProps } from './interface';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/pro-regular-svg-icons';

const NavigationButton = styled.button<INavigationButtonProps>`
  border: 0;
  background: transparent;
  color: currentColor;
  font-size: 16px;
  transition: opacity 300ms ease;
  cursor: ${({ isUnavailable }) => (isUnavailable ? 'default' : 'pointer')};
  opacity: ${({ isUnavailable }) => (isUnavailable ? 0.4 : 1)};

  &:focus {
    outline: 0;
  }

  &:focus,
  &:hover {
    ${({ isUnavailable }) => !isUnavailable && { opacity: 0.8 }}
  }
`;

const CurrentItemDisplay = styled.span`
  margin: 0 10px;
`;

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
