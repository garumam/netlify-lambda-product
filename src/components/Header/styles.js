import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  width: 100%;
  height: ${(props) => props.theme.headerHeightMobile};
  font-size: 1.5em;
  background: ${(props) => props.theme.bgPrimaryColor};
  position: fixed;
`;

export const CartNotification = styled.div`
  position: relative;

  & > span {
    right: -10px;
    top: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background: ${(props) => props.theme.bgSecondaryColor};
    position: absolute;
    font-size: 0.75rem;
    font-weight: 700;
  }
`;
