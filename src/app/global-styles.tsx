import { css, Global } from '@emotion/core';
import React from 'react';

export const COLORS = {
  CHART_BAR: '#4edfa5',
  DANGER: 'orangered',
  GRAY: '#f1f1f1',
  DARK_GRAY: '#626262',
  LIGHT_BLACK: '#404040',
  BLACK: '#323232',
  WHITE: '#fff',
};

const styles = css`
  body,
  html,
  #root {
    font-size: 18px;
    background-color: ${COLORS.BLACK};
    color: ${COLORS.WHITE};
    font-family: Roboto, sans-serif, sans-serif, Verdana, Geneva, Tahoma;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  button {
    border: 0;
    background: transparent;
    color: currentColor;
    font-size: 1em;
    cursor: pointer;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

export const GlobalStyles: React.SFC = () => <Global styles={styles} />;
