import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  background: ${(props) => props.theme.bgSecondaryColor};
  padding: ${(props) => props.theme.paddingDefault};

  & > ul {
    max-width: 1500px;
    margin: auto;
  }

  @media (min-width: 700px) {
    & > ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
    }
  }

  @media (min-width: 1024px) {
    & > ul {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  padding: 0 ${(props) => props.theme.paddingDefault};
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  height: 2rem;
  max-width: 500px;

  & > input {
    flex: 1;
    height: inherit;
    background: transparent;
    border: solid 1px ${(props) => props.theme.textColor};
    border-radius: 5px;
    outline: none;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    font-weight: 700;
    color: ${(props) => props.theme.textColor};

    &:focus {
      border-color: ${(props) => props.theme.bgSecondaryColor};
      caret-color: ${(props) => props.theme.bgSecondaryColor};
    }
  }

  & > svg {
    cursor: pointer;
    flex: 0 0 2.8rem;
    padding-left: 0.5rem;
    height: inherit;
    &:hover {
      fill: ${(props) => props.theme.textColorTitles};
    }
  }
`;
