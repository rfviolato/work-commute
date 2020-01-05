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
  cursor: ${({ isUnavailable }) => (isUnavailable ? 'not-allowed' : 'pointer')};
  opacity: ${({ isUnavailable }) => (isUnavailable ? 0.4 : 1)};

  &:focus {
    outline: 0;
  }
`;

const CurrentItemDisplay = styled.span`
  margin: 0 10px;
`;

export const ListItemPicker: React.FC<IListItemPickerProps> = ({
  list,
  initialIndex,
  onChange = () => {},
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const onPreviousClick = React.useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      onChange(currentIndex - 1);
    }
  }, [currentIndex]);
  const onNextClick = React.useCallback(() => {
    if (currentIndex < list.length - 1) {
      setCurrentIndex(currentIndex + 1);
      onChange(currentIndex + 1);
    }
  }, [currentIndex]);

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
