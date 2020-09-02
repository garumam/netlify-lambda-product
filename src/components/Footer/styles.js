import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 0.9em;
  font-weight: 300;
  border-top: solid 1px ${(props) => `rgba(${props.theme.bgSCRGB}, 0.3)`};

  & > a {
    padding-left: 3px;
  }
`;
