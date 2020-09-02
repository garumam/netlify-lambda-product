import styled from 'styled-components';

export const Container = styled.button`
  grid-area: cart;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: ${(props) => props.theme.textColorTitles};

  &:hover,
  &.active {
    background: ${(props) => props.theme.textColorTitles};
    color: ${(props) => props.theme.textColor};
  }
`;
