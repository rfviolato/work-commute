import styled from '@emotion/styled';

export const CSS_VARS = {
  GRID_GUTTER: 32,
  MQ: {
    SMALL: 620,
  },
};

export const Root = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${CSS_VARS.GRID_GUTTER}px;
  justify-content: center;

  @media (max-width: ${CSS_VARS.MQ.SMALL}px) {
    grid-template-columns: 100%;
    grid-column-gap: 0;
    grid-row-gap: 45px;
  }
`;
