import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;

  p {
    text-align: center;
  }

  span {
    color: ${(props) => props.theme.textColorTitles};
  }
`;
