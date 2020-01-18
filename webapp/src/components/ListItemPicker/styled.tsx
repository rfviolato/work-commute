import styled from '@emotion/styled';

export interface INavigationButtonProps {
  isUnavailable: boolean;
}

export const NavigationButton = styled.button<INavigationButtonProps>`
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

export interface INavigationButtonProps {
  isUnavailable: boolean;
}

export const CurrentItemDisplay = styled.span`
  margin: 0 10px;
`;
