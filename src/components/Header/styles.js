import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem;
  padding-top: 1rem;
  width: 100%;
  height: ${(props) => props.theme.headerHeightMobile};
  font-size: 1.5em;
  background: ${(props) => props.theme.bgPrimaryColor};
  position: fixed;
  border-bottom: solid 1px ${(props) => `rgba(${props.theme.bgSCRGB}, 0.3)`};
  z-index: 2;

  svg:hover {
    cursor: pointer;
    fill: ${(props) => props.theme.textColorTitles};
  }
`;

export const CartNotification = styled.div`
  position: relative;
  height: fit-content;
  padding: 0.5rem;
  padding-bottom: 0rem;

  &:hover {
    cursor: pointer;
    svg {
      fill: ${(props) => props.theme.textColorTitles};
    }
  }

  & > span {
    color: white;
    right: -3px;
    top: -3px;
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
