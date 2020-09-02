import styled, { css } from 'styled-components';

const beforeCssForGapDivider = css`
  content: '';
  position: absolute;
  left: -8px;
  transform: translateY(5%);
  height: 100%;
  width: 1px;
  border-left: dashed 1px ${(props) => `rgba(${props.theme.bgSCRGB}, 0.3)`};
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h2 {
    color: ${(props) => props.theme.textColorTitles};
    font-size: 1.5rem;
    position: fixed;
    top: 60px;
    z-index: 3;
  }

  & > ul {
    max-width: 1500px;
    margin: auto;
    padding: 1rem 0;

    & > li {
      position: relative;
    }
  }

  @media (min-width: 700px) {
    & > ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
      padding: 2rem 0;

      & > li:nth-child(2n) {
        ::before {
          ${beforeCssForGapDivider}
        }
      }

      & > li:nth-child(2) {
        border-top: transparent;
      }
    }
  }

  @media (min-width: 1024px) {
    & > ul {
      grid-template-columns: repeat(3, 1fr);

      & > li:nth-child(n + 2) {
        ::before {
          ${beforeCssForGapDivider}
        }
      }

      & > li:nth-child(4n) {
        ::before {
          border-left: transparent;
        }
      }

      & > li:nth-child(3) {
        border-top: transparent;
      }
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  width: 100%;
  max-width: 400px;
  position: fixed;
  top: 75px;
  z-index: 3;

  button {
    border-radius: 50%;
    border-color: rgba(0, 0, 0, 0.2);
    height: 3rem;
    width: 3rem;
    color: white;
    background: ${(props) => props.theme.bgSecondaryColor};

    svg {
      font-size: 2rem;
    }
  }
`;
