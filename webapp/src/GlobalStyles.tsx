import { css, Global } from '@emotion/core';
import React from 'react';

const styles = css`
  body,
  html,
  #root {
    font-size: 18px;
    background-color: #323232;
    color: #fff;
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
`;

const GlobalStyles: React.SFC = () => <Global styles={styles} />;

export default GlobalStyles;
